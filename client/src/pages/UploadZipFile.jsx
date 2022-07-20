import React from "react";

const UploadZipFile = () => {
  return (
    <div>
      <form action="/single" method="POST" enctype="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit">Uploadsadasda</button>
      </form>
    </div>
  );
};

export default UploadZipFile;
