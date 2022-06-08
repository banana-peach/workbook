import request from "@/network/request";

export function upload(data) {
  console.log(data !== null);
  if (data) {
    const param = new FormData();
    param.append("file", data?.file);
    console.log(param.get("file"));
    return request({
      url: "/uploadFile",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      method: "post",
      data: param,
      transformRequest: null
    });
  }
}
