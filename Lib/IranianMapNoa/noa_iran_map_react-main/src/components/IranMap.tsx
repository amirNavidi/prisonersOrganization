// "use client";
// import React, { useState, useEffect,useContext } from "react";
// import { ThemeProvience } from "../../../../../Components/WaysToHelpC";
// import Cookies from "js-cookie";

// interface Props {
//   data: { [key: string]: number };
//   color?: string;
//   backgroundColor?: string;
//   height?: string;
//   listItems?: number;
//   showListValue?: boolean;
//   showListTitle?: boolean;
//   fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
//   styles?: React.CSSProperties;
// }

// function getProvincePersianTitle(id: string) {

//   const provinces = [
//     { title: "البرز", id: "IR-32" },
//     { title: "کرمان", id: "IR-15" },
//     { title: "سیستان و بلوچستان", id: "IR-13" },
//     { title: "خراسان شمالی", id: "IR-31" },
//     { title: "خراسان رضوی", id: "IR-30" },
//     { title: "خراسان جنوبی", id: "IR-29" },
//     { title: "کردستان", id: "IR-16" },
//     { title: "گیلان", id: "IR-19" },
//     { title: "کرمانشاه", id: "IR-17" },
//     { title: "آذربایجان شرقی", id: "IR-01" },
//     { title: "آذربایجان غربی", id: "IR-02" },
//     { title: "قزوین", id: "IR-28" },
//     { title: "زنجان", id: "IR-11" },
//     { title: "همدان", id: "IR-24" },
//     { title: "قم", id: "IR-26" },
//     { title: "مرکزی", id: "IR-22" },
//     { title: "اردبیل", id: "IR-03" },
//     { title: "هرمزگان", id: "IR-23" },
//     { title: "ایلام", id: "IR-05" },
//     { title: "لرستان", id: "IR-20" },
//     { title: "خوزستان", id: "IR-10" },
//     { title: "چهارمحال و بختیاری", id: "IR-08" },
//     { title: "یزد", id: "IR-25" },
//     { title: "تهران", id: "IR-07" },
//     { title: "سمنان", id: "IR-12" },
//     { title: "مازندران", id: "IR-21" },
//     { title: "گلستان", id: "IR-27" },
//     { title: "فارس", id: "IR-14" },
//     { title: "اصفهان", id: "IR-04" },
//     { title: "بوشهر", id: "IR-06" },
//     { title: "کهگیلویه و بویراحمد", id: "IR-18" },
//   ];

//   const province = provinces.find((i) => i.id === id);



//   return province?.title || "";
// }

// function hexToRgb(hex: string) {
//   hex = hex.replace(/^#/, "");
//   if (hex.length === 3) {
//     hex = hex.split("").map((x) => x + x).join("");
//   }
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);
//   return [r, g, b];
// }

// export default function IranMap({
//   data,
//   color = "#177a6e",
//   backgroundColor = "#e8e8e8",
//   height = "380",
//   listItems = 5,
//   showListValue = false,
//   fontSize = "md",
//   styles,
// }: Props) {
//     const context = useContext(ThemeProvience);
//     if (!context) return null;
//   const { mySelectedProvience, setMySelectedProvince , setPrisonersCount } = context;

//   const [svgContent, setSvgContent] = useState<string | null>(null);
//   const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string | null }>({ x: 0, y: 0, name: null });
//   const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

//   const rgbDefaultColor = hexToRgb(color);
//   const hoverColor = `rgba(${rgbDefaultColor[0]},${rgbDefaultColor[1]},${rgbDefaultColor[2]},0.4)`;
//   const maxValue = Math.max(...Object.values(data));

//   const sortedData = Object.entries(data)
//     .sort(([, valueA], [, valueB]) => valueB - valueA)
//     .slice(0, listItems);
//   const output = sortedData.map(([key, value]) => ({ code: key, value }));

//   let NumberedFontSize = 14;
//   if (fontSize === "xs") NumberedFontSize = 10;
//   else if (fontSize === "sm") NumberedFontSize = 12;
//   else if (fontSize === "lg") NumberedFontSize = 18;
//   else if (fontSize === "xl") NumberedFontSize = 20;

//   useEffect(() => {
//     fetch("https://freecyberhawk.github.io/noa_iran_map_react/assets/iran.svg")
//       .then((res) => res.text())
//       .then((data) => setSvgContent(data))
//       .catch((error) => console.error("Error loading SVG:", error));
//   }, []);


//   const getColorByValue = (value: number) => {
//     const intensity = 0.5 + value / (maxValue * 2);
//     return `rgba(${rgbDefaultColor[0]}, ${rgbDefaultColor[1]}, ${rgbDefaultColor[2]}, ${intensity})`;
//   };

//   const updateSvgColors = () => {
//     if (!svgContent) return null;
//     let updatedSvg = svgContent;

//     const allPathsRegex = /<path[^>]*id="([^"]+)"[^>]*>/g;
//     updatedSvg = updatedSvg.replace(allPathsRegex, (match, id) => {
//       const value = data[id];
//       const color = value ? getColorByValue(value) : backgroundColor;
//       return match
//         .replace(/fill="[^"]*"/, "")
//         .replace(
//           /\/?>/,
//           ` fill="${color}" stroke="#FFFF" stroke-width="2" data-id="${id}" data-value="${value || 0}" style="cursor:pointer;" />`
//         );
//     });

//     return updatedSvg;
//   };

//   const handleMouseMove = (event: React.MouseEvent) => {
//     const target = event.target as SVGElement;
//     const id = target.getAttribute("data-id");


//     if (id) {
//       setTooltip({
//         x: event.clientX + 12,
//         y: event.clientY + 12,
//         name: getProvincePersianTitle(id),
//       });
//     } else {
//       setTooltip({ x: 0, y: 0, name: null });
//     }
//   };
//   const [provinceId , setProvinceId] =useState<number|string>('')
//   const handleClick = async (event: React.MouseEvent) => {
//     const target = event.target as SVGElement;
//     const id = target.getAttribute("data-id");
//     if (id) {
//       const provinceTitle = getProvincePersianTitle(id);
//       setSelectedProvince(provinceTitle);
//       setMySelectedProvince(provinceTitle);
//       setProvinceId(id);
//       await selectProvince(id);
//     }
//   };

//   const handleMouseLeave = () => {
//     setTooltip({ x: 0, y: 0, name: null });
//   };
//   const CustomerUID = Cookies.get('CustomerUID');
//   const token =Cookies.get('token');


//   const selectProvince = async(provinceId: string) => {
//     const result = await fetch("/api/set-selected-province", {
//          method: 'POST',
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({
//             ProvinceID: provinceId,
//             RangeList: ["500000000", "1000000000"]
//         })
//     });

//     const data = await result.json();
//     setPrisonersCount(data.data);
//     Cookies.set('selectedProvinceID',data.data.ProvinceID);
//   }


//   return (
//     <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleClick} >
//       {svgContent && (
//         <div
//           style={{
//             // display: "flex",
//             // width: "100%",
//             // height: "400px",
//             // alignItems: "center",
//             // gap: 14,
//             // ...styles,
//           }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 660 660"
//             preserveAspectRatio="xMidYMid meet"
//             style={{ width: "auto", height: height }}
//             dangerouslySetInnerHTML={{ __html: updateSvgColors() || "" }}
//           />
//           <ul style={{ listStyle: "none", maxHeight: height, overflowY: "scroll", scrollbarWidth: "none" }}>
//             {output.map((i) => (
//               <li key={i.code} style={{ display: "flex", alignItems: "center", gap: 5, margin: "8px 0" }}>
//                 <span
//                   style={{
//                     width: 14,
//                     height: 14,
//                     borderRadius: "50%",
//                     backgroundColor: `${getColorByValue(i.value)}`,
//                   }}
//                 ></span>
//                 <p style={{ fontSize: NumberedFontSize }}>{getProvincePersianTitle(i.code)}</p>
//                 {showListValue && (
//                   <p style={{ fontSize: NumberedFontSize, marginLeft: "20px" }}>{i.value}</p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {selectedProvince && (
//         <p
//           style={{
//             marginTop: 12,
//             fontSize: "14px",
//             textAlign: "center",
//             fontWeight: "bold",
//             color: "#333",
//           }}
//         >
//         </p>
//       )}

//       {/* Tooltip */}
//       {tooltip.name && (
//         <div
//           style={{
//             position: "fixed",
//             top: tooltip.y + 2,
//             left: tooltip.x + 2,
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             color: "#fff",
//             padding: "5px 10px",
//             borderRadius: "5px",
//             pointerEvents: "none",
//             fontSize: "12px",
//           }}
//         >
//           {tooltip.name}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useContext } from "react";
import { ThemeProvience } from "../../../../../Components/WaysToHelpC";
import Cookies from "js-cookie";

interface Props {
  data: { [key: string]: number };
  color?: string;
  backgroundColor?: string;
  height?: string;
  listItems?: number;
  showListValue?: boolean;
  showListTitle?: boolean;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  styles?: React.CSSProperties;
}

function getProvincePersianTitle(id: string) {
  const provinces = [
    { title: "البرز", id: "IR-32" },
    { title: "کرمان", id: "IR-15" },
    { title: "سیستان و بلوچستان", id: "IR-13" },
    { title: "خراسان شمالی", id: "IR-31" },
    { title: "خراسان رضوی", id: "IR-30" },
    { title: "خراسان جنوبی", id: "IR-29" },
    { title: "کردستان", id: "IR-16" },
    { title: "گیلان", id: "IR-19" },
    { title: "کرمانشاه", id: "IR-17" },
    { title: "آذربایجان شرقی", id: "IR-01" },
    { title: "آذربایجان غربی", id: "IR-02" },
    { title: "قزوین", id: "IR-28" },
    { title: "زنجان", id: "IR-11" },
    { title: "همدان", id: "IR-24" },
    { title: "قم", id: "IR-26" },
    { title: "مرکزی", id: "IR-22" },
    { title: "اردبیل", id: "IR-03" },
    { title: "هرمزگان", id: "IR-23" },
    { title: "ایلام", id: "IR-05" },
    { title: "لرستان", id: "IR-20" },
    { title: "خوزستان", id: "IR-10" },
    { title: "چهارمحال و بختیاری", id: "IR-08" },
    { title: "یزد", id: "IR-25" },
    { title: "تهران", id: "IR-07" },
    { title: "سمنان", id: "IR-12" },
    { title: "مازندران", id: "IR-21" },
    { title: "گلستان", id: "IR-27" },
    { title: "فارس", id: "IR-14" },
    { title: "اصفهان", id: "IR-04" },
    { title: "بوشهر", id: "IR-06" },
    { title: "کهگیلویه و بویراحمد", id: "IR-18" },
  ];

  const province = provinces.find((i) => i.id === id);
  return province?.title || "";
}

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
}

export default function IranMap({
  data,
  color = "#177a6e",
  backgroundColor = "#e8e8e8",
  height = "380",
  listItems = 5,
  showListValue = false,
  fontSize = "md",
  styles,
}: Props) {

  const context = useContext(ThemeProvience);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string | null }>({
    x: 0,
    y: 0,
    name: null
  });
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [provinceId, setProvinceId] = useState<number | string>('');


  // useEffect(() => {
  //   fetch("https://freecyberhawk.github.io/noa_iran_map_react/assets/iran.svg")
  //     .then((res) => res.text())
  //     .then((data) => setSvgContent(data))
  //     .catch((error) => console.error("Error loading SVG:", error));
  // }, []);

    useEffect(() => {
      fetch("/images/iran.svg")
        .then((res) => res.text())
        .then((data) => setSvgContent(data))
        .catch((error) => console.error("Error loading SVG:", error));
    }, []);


  if (!context) {
    return null;
  }

  const { mySelectedProvience, setMySelectedProvince, setPrisonersCount } = context;

  const rgbDefaultColor = hexToRgb(color);
  const hoverColor = `rgba(${rgbDefaultColor[0]},${rgbDefaultColor[1]},${rgbDefaultColor[2]},0.4)`;
  const maxValue = Math.max(...Object.values(data));

  const sortedData = Object.entries(data)
    .sort(([, valueA], [, valueB]) => valueB - valueA)
    .slice(0, listItems);
  const output = sortedData.map(([key, value]) => ({ code: key, value }));

  let NumberedFontSize = 14;
  if (fontSize === "xs") NumberedFontSize = 10;
  else if (fontSize === "sm") NumberedFontSize = 12;
  else if (fontSize === "lg") NumberedFontSize = 18;
  else if (fontSize === "xl") NumberedFontSize = 20;

  const getColorByValue = (value: number) => {
    const intensity = 0.5 + value / (maxValue * 2);
    return `rgba(${rgbDefaultColor[0]}, ${rgbDefaultColor[1]}, ${rgbDefaultColor[2]}, ${intensity})`;
  };

  const updateSvgColors = () => {
    if (!svgContent) return null;
    let updatedSvg = svgContent;

    const allPathsRegex = /<path[^>]*id="([^"]+)"[^>]*>/g;
    updatedSvg = updatedSvg.replace(allPathsRegex, (match, id) => {
      const value = data[id];
      const color = value ? getColorByValue(value) : backgroundColor;
      return match
        .replace(/fill="[^"]*"/, "")
        .replace(
          /\/?>/,
          ` fill="${color}" stroke="#FFFF" stroke-width="2" data-id="${id}" data-value="${value || 0}" style="cursor:pointer;" />`
        );
    });

    return updatedSvg;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const target = event.target as SVGElement;
    const id = target.getAttribute("data-id");

    if (id) {
      setTooltip({
        x: event.clientX + 12,
        y: event.clientY + 12,
        name: getProvincePersianTitle(id),
      });
    } else {
      setTooltip({ x: 0, y: 0, name: null });
    }
  };

  const handleClick = async (event: React.MouseEvent) => {
    const target = event.target as SVGElement;
    const id = target.getAttribute("data-id");
    if (id) {
      const provinceTitle = getProvincePersianTitle(id);
      setSelectedProvince(provinceTitle);
      setMySelectedProvince(provinceTitle);
      setProvinceId(id);
      await selectProvince(id);
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ x: 0, y: 0, name: null });
  };

  const CustomerUID = Cookies.get('CustomerUID');
  const token = Cookies.get('token');

  const selectProvince = async (provinceId: string) => {
    const result = await fetch("/api/set-selected-province", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ProvinceID: provinceId,
        RangeList: ["500000000", "1000000000"]
      })
    });

    const data = await result.json();
    setPrisonersCount(data.data);
    Cookies.set('selectedProvinceID', data.data.ProvinceID);
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {svgContent && (
        <div
          style={{
            // display: "flex",
            // width: "100%",
            // height: "400px",
            // alignItems: "center",
            // gap: 14,
            // ...styles,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 660 660"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "auto", height: height }}
            dangerouslySetInnerHTML={{ __html: updateSvgColors() || "" }}
          />
          <ul style={{ listStyle: "none", maxHeight: height, overflowY: "scroll", scrollbarWidth: "none" }}>
            {output.map((i) => (
              <li key={i.code} style={{ display: "flex", alignItems: "center", gap: 5, margin: "8px 0" }}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: `${getColorByValue(i.value)}`,
                  }}
                ></span>
                <p style={{ fontSize: NumberedFontSize }}>{getProvincePersianTitle(i.code)}</p>
                {showListValue && (
                  <p style={{ fontSize: NumberedFontSize, marginLeft: "20px" }}>{i.value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedProvince && (
        <p
          style={{
            marginTop: 12,
            fontSize: "14px",
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
        </p>
      )}

      {/* Tooltip */}
      {tooltip.name && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y + 2,
            left: tooltip.x + 2,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            pointerEvents: "none",
            fontSize: "12px",
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}