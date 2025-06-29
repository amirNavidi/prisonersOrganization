const getBaseUrl = (req) => {
    if (req && req.headers) {
      return req.headers.host && req.headers.host.includes("localhost")
        ? "https://77.104.81.93:8092"
        : "https://localhost:8092";
    }

    return "https://localhost:8092";
  };


  export default getBaseUrl;
