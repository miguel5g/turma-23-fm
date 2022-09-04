const videoIdRegEx = /^https\:\/\/youtu\.be\/([\w\d\-\_]+)$/;

function getIdFromUrl(url: string): string | null {
  const urlMatch = url.match(videoIdRegEx);

  return urlMatch && urlMatch[1];
}

export { getIdFromUrl };
