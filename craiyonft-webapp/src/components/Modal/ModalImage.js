const ModalImage = ({ src, className }) => {
  return (
    <div className={`w-full h-[200px] border rounded-[14.7px] ${className} overflow-hidden`}>
      <img src={src} alt="Modal Description" className="w-full h-full object-cover" />
    </div>
  )
}

export default ModalImage;
