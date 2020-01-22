onmessage = event => {
  let fileContents = event.data;
  postMessage(
    fileContents
      .split("")
      .reverse()
      .join("")
  );
};
