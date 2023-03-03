export const getQueryString = (search = window.location.search, name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

export const delay = ms => new Promise(res => setTimeout(res, ms));
