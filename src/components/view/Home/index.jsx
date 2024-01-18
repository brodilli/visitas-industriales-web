import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import "./home.css";

export default function Home() {
  return (
    <div className="body">
      <h2>
        Página para la administración de visitas industriales del Instituto
        Tecnológico de Ciudad Guzmán
      </h2>

      <p>
        Bienvenido a nuestra plataforma de administración de visitas
        industriales. Aquí podrás realizar solicitudes de visitas a las empresas
        que se encuentran registradas en nuestra plataforma, así como tambien
        ver las solicitudes realizada y programadas.
      </p>

      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop showStatus={false}>
          <div>
            <img
              src="https://scontent.fbjx4-1.fna.fbcdn.net/v/t39.30808-6/369186607_713559987452999_5321633222814910915_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeFXheL1DDrWGv3DGZ7avdCM_cQpCEZyr2r9xCkIRnKvagbZvwmWVHJ0iOXsZnU8raVDVjx0c-jNqdQFjKvqN-8c&_nc_ohc=ftqPnjdrMT8AX_WCXIt&_nc_ht=scontent.fbjx4-1.fna&oh=00_AfD9j60LViFTftyyuyMwEVkgBQSf4StokPflVFcE9sTDVg&oe=65AB7D39"
              alt="Imagen 1"
            />
          </div>
          <div>
            <img
              src="https://scontent.fbjx4-1.fna.fbcdn.net/v/t39.30808-6/370502856_713560154119649_2614782697348191649_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeEpsWLD654BdQIu6pXbXgkuej0cfEDb4t56PRx8QNvi3u78xz-8AUoagT3HJ71zqc-ZuhtGsKRZTC26FLEsMlPU&_nc_ohc=aIG61Qkl5CAAX9s7e5U&_nc_ht=scontent.fbjx4-1.fna&oh=00_AfAWkeHGLhD3tMHt-i-UKEYc0tv7l6gxcX5Qo40iya3ckg&oe=65AA5BEE"
              alt="Imagen 2"
            />
          </div>
          <div>
            <img
              src="https://media.licdn.com/dms/image/C5622AQGJFPaZrKHqzA/feedshare-shrink_2048_1536/0/1666314592338?e=1708560000&v=beta&t=LD3EM8mFWAcdlpnf6BAMIMeXxjlDoFgP5oW3T7nJt-8"
              alt="Imagen 3"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
