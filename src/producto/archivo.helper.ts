export const renameFile = (req, file, callback)=>{

    const name = file.originalname.split('.')[0];
    //const fileName = file.originalname;
    const fechaActual: Date = new Date();
    const datoformateado = fechaActual.toISOString()
     .replace(/[-T:.Z]/g, '') // Elimina caracteres no deseados
    .slice(0, -1);

         console.log("HOLOS AQUI ESTA TODO",`${name}`);
         const fileNames = file.originalname.replace(/\s/g, '');
         callback(null, String(`${datoformateado}-${fileNames}`));
}

export const fileFilter  = (req, file, callback)=>{

     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback (new Error ('Fomato Invalido'), false)
     }

     callback(null, true)


}