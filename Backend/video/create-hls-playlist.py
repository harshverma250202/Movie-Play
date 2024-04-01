# THIS SCRIPT CREATES AN HLS PLAYLIST FOR A GIVEN SOURCE VIDEO
# REFERENCE - https://ottverse.com/hls-packaging-using-ffmpeg-live-vod/

import subprocess
import json

SETTINGS = [
	{
		'resolution': (1920, 1080),
		'video_bitrate': '5M',
		'audio_bitrate': '96k'
	},
	{
		'resolution': (1280, 720),
		'video_bitrate': '3M',
		'audio_bitrate': '96k'
	},
	{
		'resolution': (640, 360),
		'video_bitrate': '1M',
		'audio_bitrate': '48k'
	}
]
HLS_SEGMENT_LENGTH = 2 # Length of each segment in seconds
SOURCE_FILES = [
	'sources_original/source1.mp4',
	'sources_original/source2.mp4',
	'sources_original/source3.mp4',
	'sources_original/source4.mp4',
	'sources_original/source5.mp4',
	'sources_original/source6.mp4',
	'sources_original/source7.mp4',
] # Source files for each of the videos

def generate_streams(video_number, source_file):
	output_folder = f"video_{video_number}"
	stream_playlist_file = f"{output_folder}/%v/stream.m3u8"
	segment_filename = f"{output_folder}/%v/segment_%d.ts"
	master_playlist_file = f"index.m3u8"
	settings_file = f"{output_folder}/settings.json"

	ffmpeg_args = ['-i', source_file]

	# The -filter_complex command for scaling
	ffmpeg_args.append('-filter_complex')

	# Write the split command
	split_command = f"[0:v]split={len(SETTINGS)}"
	for (i, _) in enumerate(SETTINGS):
		split_command += f"[v{i+1}]"

	# Scaling commands
	scale_parts = []
	for (i, setting) in enumerate(SETTINGS):
		scale_parts.append(f"[v{i+1}]scale=w={setting['resolution'][0]}:h={setting['resolution'][1]}[v{i+1}out]")

	filter_complex_command = f"{split_command}; {';'.join(scale_parts)}"
	ffmpeg_args.append(filter_complex_command)

	# The -map command for adaptive bitrates

	# Set video bitrates
	for (i, setting) in enumerate(SETTINGS):
		ffmpeg_args.extend(["-map", f"[v{i+1}out]"]) # Select video track

		ffmpeg_args.extend([f"-c:v:{i}", "libx264", "-x264-params", 'nal-hrd=cbr:force-cfr=1']) # Select video track and set its codec (also set CBR - constant bitrate)
		ffmpeg_args.extend(['-preset', 'slow']) # Use libx254 slow preset for encoding

		ffmpeg_args.extend([f"-b:v:{i}", f"{setting['video_bitrate']}"])

		# Important settings for ABR, these ensure that to display a new frame, previous frames are not required
		ffmpeg_args.extend(['-g', '48']) # GOP size: https://en.wikipedia.org/wiki/Group_of_pictures
		ffmpeg_args.extend(['-keyint_min', '48']) # Same
		ffmpeg_args.extend(['-sc_threshold', '48']) # Scene change detection threshold

	# Set audio bitrates
	for (i, setting) in enumerate(SETTINGS):
		ffmpeg_args.extend(['-map', 'a:0']) # Select the first audio track of the source file
		ffmpeg_args.extend([f"-c:a:{i}", "aac"]) # Set aac codec for the ith encoded audio track
		ffmpeg_args.extend(["-ac", "2"]) # Two audio channels
		ffmpeg_args.extend([f"-b:a:{i}", f"{setting['audio_bitrate']}"]) # Set bitrate

	# Set outputs
	ffmpeg_args.extend(['-f', 'hls'])
	ffmpeg_args.extend(["-hls_time", f"{HLS_SEGMENT_LENGTH}"]) # Segment lengths
	ffmpeg_args.extend(["-hls_playlist_type", "vod"]) # Type VOD (instead of live)
	ffmpeg_args.extend(["-hls_flags", "independent_segments"]) # Ensures each segment begins with a keyframe, See https://en.wikipedia.org/wiki/Group_of_pictures
	ffmpeg_args.extend(["-hls_segment_type", f"mpegts"]) # Segment filetypes
	ffmpeg_args.extend(["-hls_segment_filename", segment_filename]) # Segment filenames
	ffmpeg_args.extend(["-master_pl_name", master_playlist_file]) # Set top level m3u8 playlist

	# Create stream maps, combining video and audio tracks
	ffmpeg_args.append('-var_stream_map')
	stream_maps = []
	for (i, setting) in enumerate(SETTINGS):
		stream_maps.append(f"v:{i},a:{i}")

	ffmpeg_args.append(" ".join(stream_maps))
	ffmpeg_args.append(stream_playlist_file) # Set each stream's m3u8 playlist

	subprocess.run(['ffmpeg', *ffmpeg_args])

	with open(settings_file, 'w') as specsfile:
		json.dump(SETTINGS, specsfile)

# Process the generated streams; Change the paths to segments to the endpoint urls
def process_streams(video_number):
	# Change paths to substreams to /video/stream/video_number/stream_number
	with open(f"video_{video_number}/index.m3u8") as index_stream:
		index_playlist_text = index_stream.readlines()

		for i in range(len(index_playlist_text)):
			line = index_playlist_text[i]

			if line.find('stream.m3u8') != -1:
				stream_number = line.split('/')[0]
				index_playlist_text[i] = f"/video/stream/{video_number}/{stream_number}\n"

		open(f"video_{video_number}/index.m3u8", 'w').writelines(index_playlist_text)

	for stream_number in range(len(SETTINGS)):
		# For each stream playlist, change segment paths to /video/segment/video_number/stream_number/segment_number
		with open(f"video_{video_number}/{stream_number}/stream.m3u8") as stream:
			stream_playlist_text = stream.readlines()

			for i in range(len(stream_playlist_text)):
				line = stream_playlist_text[i]

				if line.find('segment_') != -1 and line.find('.ts') != - 1:
					segment_number = line.split('_')[1].split('.')[0]
					stream_playlist_text[i] = f"/video/segment/{video_number}/{stream_number}/{segment_number}\n"

			open(f"video_{video_number}/{stream_number}/stream.m3u8", 'w').writelines(stream_playlist_text)

for (i, source_file) in enumerate(SOURCE_FILES):
	generate_streams(i, source_file) # Generate streams for this video
	process_streams(i) # Process the generated streams
