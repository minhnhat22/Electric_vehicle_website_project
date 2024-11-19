import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import './Style.scss';  // Thêm file SCSS cho responsive

const ImageComponent = ({ src, alt, to, preview, href, width = "100%", height = "auto", ...rests }) => {
  return (
    <Link to={to}>
      <Image 
        src={src} 
        alt={alt} 
        href={href}  // Add href prop if you want to redirect to a different page
        preview={preview}
        width={width}  // Cập nhật width, có thể thay đổi giá trị tùy theo nhu cầu
        height={height} // Cập nhật height
        {...rests}
      />
    </Link>
  );
}

export default ImageComponent;
