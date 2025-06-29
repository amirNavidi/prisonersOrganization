import fetch from "node-fetch";
import https from "https"; 
import getBaseUrl from "../URL/baseUrl";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const APICaller = async (req,subAddress, body , staticURL) => {
  const baseUrl = getBaseUrl(req);
  const finalUrl = staticURL ? `${staticURL}/${subAddress}`:`${baseUrl}/${subAddress}`;
  console.log("this is finalUrl", finalUrl);
  console.log("this is body", body);

  try {
    const APIFunc = await fetch(finalUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      agent,
    });

    if (!APIFunc.ok) {
      throw new Error(`HTTP error! status: ${APIFunc.status}`);
    }

    return await APIFunc.json();
  } catch (err) {
    console.error("Error in APICallerFetch:", err);
    throw err;
  }
};

export { APICaller };
