const Footer = () => {
    return (
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-3 px-6 flex justify-between items-center shadow-lg dark:bg-gray-800 dark:text-gray-300">
        
        {/* 📌 Texto alineado a la izquierda con enlace */}
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <a href="https://softbyte-commerce.cacaobyte.com/" 
             className="font-bold hover:text-blue-400 transition-colors">
            SoftByte Commerce
          </a>. Todos los derechos reservados.
        </p>
  
        {/* 📌 Texto y logo alineados a la derecha */}
        <div className="flex items-center gap-3">
          <span className="text-sm">Desarrollado por</span>
          <a href="https://cacaobyte.com" className="text-sm underline hover:text-gray-400 transition-colors">
            CacaoByte S.A
          </a>
          <img src="/Logo_CacaoByte_S.A.png" alt="CacaoByte Logo" className="w-6 h-6 object-contain" />
        </div>
  
      </footer>
    );
  };
  
  export default Footer;
  