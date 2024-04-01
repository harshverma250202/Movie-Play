import { asyncHandler } from "../utilities/asyncHandler.js";
import { readFile, readdir, stat } from "fs/promises";
import { join } from "path";
import { VIDEO_STORAGE_PATH } from "../constants.js";

// Path to all the files for a particular video (A video is divided into multiple streams of different resolutions and bitrates)
const get_video_path = (video) => {
    return join(VIDEO_STORAGE_PATH, `video_${video}`);
}

// Path to the source video file (mp4) for download
const get_video_source_file = (video) => {
    return join(VIDEO_STORAGE_PATH, 'sources', `source${video}.mp4`);
}

/**
 * @typedef {Object} StreamSettings
 * @property {[number, number]} resolution
 * @property {string} video_bitrate
 * @property {string} audio_bitrate
 */

/**
 * @description Returns all the settings (resolution, bitrate etc.) for a particular stream of a video
 * @returns {Promise<StreamSettings[]>}
 */
const get_video_stream_settings = async (video) => {
    return JSON.parse(await readFile(join(get_video_path(video), 'settings.json')));
}

// Returns the path to the index playlist (used for adaptive bitrate streaming) of a particular video
const get_index_playlist_path = (video) => {
    return join(get_video_path(video), 'index.m3u8');
}

// Returns the path to the folder of a particular stream of a given video (Each stream is divided into multiple segments of a fixed time length (eg: 2 seconds))
const get_stream_path = (video, stream) => {
    return join(get_video_path(video), stream.toString());
}

// Returns the path to the playlist of a particular stream of a given video
const get_stream_playlist_path = (video, stream) => {
    return join(get_stream_path(video, stream), 'stream.m3u8');
}

// Returns the path to a particular segment in a given stream of a video
const get_segment_path = (video, stream, segment) => {
    return join(get_stream_path(video, stream), `segment_${segment}.ts`);
}

// Videos limited to user subscription type
const USER_VIDEO_MAP = {
    'Free': 1, // Free user only gets the first two videos in full
    'Standard': 4, // Standard user only gets first 5 videos in full
    // Premium user gets all
    'Premium': Infinity
};

export const getRandomVideoPlaylist = asyncHandler(async (req, res) => {
    const userSubscription = req.userSubscription.subscription;

    try {
        const video_dir_contents = await readdir(VIDEO_STORAGE_PATH);
        const num_videos = video_dir_contents.filter((name) => name.match(/^video_\d$/)).length;

        const user_video_limit = USER_VIDEO_MAP[userSubscription.name];

        const video_number = Math.min(Math.floor(Math.random() * num_videos), user_video_limit);

        const index_playlist = await readFile(get_index_playlist_path(video_number));
        res.status(200).send(index_playlist);
    }
    catch(error) {
        res.status(500).send(error);
    }
})

// This endpoint returns the index playlist of a given video
export const getVideoIndexPlaylist = asyncHandler(async (req, res) => {
    const { video } = req.params;

    try {
        const index_playlist = await readFile(get_index_playlist_path(video));
        res.status(200).send(index_playlist);
    }
    catch(error) {
        res.status(500).send(error);
    }
});

// This endpoint returns the stream playlist for a given stream
export const getVideoStream = asyncHandler(async (req, res) => {
    const { video, stream } = req.params;
    const userSubscription = req.userSubscription.subscription;

    try {
        const STREAM_SETTINGS = await get_video_stream_settings(video);

        if (STREAM_SETTINGS[stream].resolution[1] <= userSubscription.resolution) {
            // If the resolution requested is in the allowed range
            const stream_playlist = await readFile(get_stream_playlist_path(video, stream));
            res.status(200).send(stream_playlist);
        } else {
            res.status(403).send('This resolution is not allowed.');
        }
    }
    catch(error) {
        res.status(500).send(error) ;
    }
});

// This endpoint returns the stream for a given resolution of a given video
export const getConstantResStream = asyncHandler(async (req, res) => {
    const { video, resolution } = req.params;
    const userSubscription = req.userSubscription.subscription;

    try {
        const checkRes = parseInt(resolution);

        const STREAM_SETTINGS = await get_video_stream_settings(video);
        const stream_index = STREAM_SETTINGS.findIndex((setting) => setting.resolution[1] === checkRes);

        if (stream_index !== -1) {
            if (checkRes <= userSubscription.resolution) {
                // If the requested resolution is allowed
                const stream_playlist = await readFile(get_stream_playlist_path(video, stream_index));
                res.status(200).send(stream_playlist);
            } else {
                res.status(403).send('This resolution is not allowed.');
            }
        } else {
            res.status(404).send('Stream at this resolution not found.');
        }
    }
    catch(error) {
        res.status(500).send(error);
    }
});

// This endpoint returns a segment in a particular stream for a given video
export const getVideoSegment = asyncHandler(async (req, res) => {
    const { video, stream, segment } = req.params;
    const userSubscription = req.userSubscription.subscription;
    const user_video_limit = USER_VIDEO_MAP[userSubscription.name];

    try {
        const STREAM_SETTINGS = await get_video_stream_settings(video);

        if (STREAM_SETTINGS[stream].resolution[1] <= userSubscription.resolution) {
            // If the resolution requested is in the allowed range

            // 15th segment is the 30s mark
            if (video > user_video_limit && segment > 14) {
                res.status(403).send('Subscribe to a higher tier to watch further.');
            } else {
                const segment_file = await readFile(get_segment_path(video, stream, segment));
                res.status(200).send(segment_file);
            }
        } else {
            res.status(403).send('This resolution is not allowed.');
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send(error) ;
    }
});

// This endpoint returns a segment in a particular stream for a given video
export const downloadVideo = asyncHandler(async (req, res) => {
    const { video } = req.params;
    const userSubscription = req.userSubscription.subscription;

    try {
        if (userSubscription.download) {
            const file_path = get_video_source_file(video);

            if ((await stat(file_path)).isFile()) {
                const video_file = await readFile(file_path);
                res.status(200).download(file_path);
            } else {
                res.status(404).send('The requested movie does not exist.');
            }
        } else {
            res.status(403).send('Download is not allowed.');
        }
    }
    catch(error) {
        if (error?.code === "ENOENT") {
            res.status(404).send('The requested movie does not exist.');
        } else {
            res.status(500).send(error);
        }
    }
});