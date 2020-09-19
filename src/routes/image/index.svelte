<script>
  import Loader from "../../components/Loader.svelte";
  import Uploaded from "../../components/Uploaded.svelte";

  let files;
  let imageName;
  let extension;
  let urlImageUploaded;
  let isUploading = false;
  let imageIsUploaded = false;
  let errorExtension = false;
  let errorUploading = false;
  let errorDescription = "";
  const typeImages = ["svg", "png", "jpg", "jpeg", "webp"];

  const changeImagen = () => {
    if (files && files[0]) {
      errorUploading = false;
      extension = files[0].name.slice(
        (Math.max(0, files[0].name.lastIndexOf(".")) || Infinity) + 1
      );
      if (typeImages.includes(extension) && files[0].size < 24048576) {
        imageName = files[0].name.slice(0, files[0].name.lastIndexOf("."));
        errorExtension = false;
      } else {
        errorExtension = true;
      }
    }
  };

  const uploadImage = () => {
    if (!errorExtension && files && imageName) {
      try {
        isUploading = true;
        const imagekit = new ImageKit({
          publicKey: "public_R/SIK3ybn8q6TkGii6JQ4SE2RZU=",
          urlEndpoint: "https://ik.imagekit.io/frenrihrkit/",
          authenticationEndpoint: "image.json",
        });
        imagekit.upload(
          {
            file: files[0],
            fileName: `${imageName}.${extension}`,
            folder: "ImageUpload",
          },
          function (err, result) {
            isUploading = false;
            if (err) {
              console.log(err);
              errorUploading = true;
              errorDescription = err.message;
            } else {
              console.log("La imagen se ha subido con exito!");
              urlImageUploaded = result.url;
              imageIsUploaded = true;
            }
          }
        );
      } catch (ex) {
        isUploading = false;
        console.log(ex);
      }
    }
  };
</script>

<style>
  .Image {
    display: grid;
    grid-template-columns: minmax(auto, 1024px);
    justify-content: center;
    margin: 0;
    padding: 2em 0;
  }
  .Image_content {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .Image_content h1 {
    text-align: center;
  }
  .Image_content p {
    text-align: center;
    margin: 0;
  }
  p > span {
    color: #8f1717;
    font-weight: 700;
  }
  .Image_content form {
    text-align: center;
  }
  .Image_form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    background-color: #f8f8f8;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    margin: 15px auto;
    border-radius: 20px;
    text-align: center;
    padding: 10px;
  }
  .Image_form:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.22);
  }
  .Image_form .Form_input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background-color: goldenrod;
    outline: none;
    opacity: 0;
    z-index: 2;
  }
  .Image_form .Form_img_uploaded {
    border-radius: 20px;
    max-width: 100%;
    margin-bottom: 15px;
    background-color: white;
  }
  .Image_form .Input_name_container {
    z-index: 3;
  }
  .Input_name_container input {
    font-size: 16px;
    padding: 8px 1px 8px 4px;
    border-radius: 5px;
  }
  .Input_name_container .img_name {
    width: 240px;
  }
  .Input_name_container .img_ext {
    width: 50px;
  }
  .No_image {
    width: 100px;
    height: 100px;
    opacity: 0.4;
    margin: 15px 0;
  }
  .message {
    opacity: 0.5;
    font-weight: 700;
    font-size: 16px;
  }
  .err_ext {
    padding: 10px 20px;
    opacity: 0.5;
    font-weight: 700;
    font-size: 16px;
  }
  .btn_submit {
    background-color: black;
    color: whitesmoke;
    padding: 8px 16px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid black;
  }
  .btn_submit:disabled {
    opacity: 0.8;
    background-color: gray;
    border-color: gray;
  }
  .btn_submit:hover:not([disabled]) {
    background-color: whitesmoke;
    color: black;
    border-color: black;
  }
  .err_desc {
    margin-bottom: 5px;
    font-size: 17px;
    font-weight: 300;
  }
  .Image_content h3 {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    padding: 0.75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
</style>

<svelte:head>
  <title>Subir imagen</title>
</svelte:head>

<div class="Image">
  <div class="Image_content">
    {#if isUploading}
      <Loader />
    {:else if imageIsUploaded}
      <h3>✔ La imagen se ha subido con éxito.</h3>
      <Uploaded url={urlImageUploaded} name={imageName} />
      <button
        class="btn_submit"
        on:click={() => {
          imageIsUploaded = false;
          files = null;
        }}>Nueva imagen</button>
    {:else}
      <h1>Escoge la imagen a subir</h1>
      <p>
        <span>Importante:</span> Solo se aceptan imágenes no mayores a 24 MB
      </p>
      <form on:submit|preventDefault={uploadImage}>
        <div class="Image_form">
          <input
            class="Form_input"
            type="file"
            accept="image/*"
            bind:files
            on:change={changeImagen}
            required />
          {#if files && files[0]}
            {#if errorExtension}
              <p class="err_ext">
                ❗ El archivo no cumple con los estándares, esto es pesar menos
                de 24MB o no ser un archivo del tipo imagen.
              </p>
            {:else}
              <img
                class="Form_img_uploaded"
                src={window.URL.createObjectURL(files[0])}
                alt="Imagen subida" />
              <p>Nombre del archivo:</p>
              <div class="Input_name_container">
                <input
                  class="img_name"
                  type="text"
                  bind:value={imageName}
                  required />
                <input
                  class="img_ext"
                  type="text"
                  value={`.${extension}`}
                  disabled />
              </div>
            {/if}
          {:else}
            <p class="message">
              Haz clic aquí para subir tu archivo o arrástralo si así lo deseas.
            </p>
            <img src="image-icon.png" alt="No hay imagen" class="No_image" />
          {/if}
        </div>
        {#if errorUploading}
          <p>
            Ocurrió un error mientras se subia la imagen. Intentelo nuevamente.
          </p>
          <p class="err_desc">❗ Error: {errorDescription}</p>
        {/if}
        <button class="btn_submit" type="submit" disabled={errorExtension}>Subir
          imagen 📤</button>
      </form>
    {/if}
  </div>
</div>
