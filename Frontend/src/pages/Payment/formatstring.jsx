function formatString(event, ssde, setShowDateError, DE, sinput) {
    ssde(false);
    setShowDateError(false);
    DE(false);
    let input = event.target.value;
    if (input.length > 5) {
      input = input.slice(0, 5);
      event.target.value = input;
      return;
    }
    sinput(input);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }
    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/'
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/'
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2'
    ).replace(
      /^(0?[2-9]|1[0-2])([0-9])?$/,
      function(match, p1, p2) {
        if (p2 !== undefined) {
          return p1 + '/' + p2;
        } else {
          return p1;
        }
      }
    ).replace(
      /^([0]+)\/|[0]+$/g, '0'
    ).replace(
      /[^\d\/]|^[\/]*$/g, ''
    ).replace(
      /\/\//g, '/'
    );
  }

  export default formatString;
