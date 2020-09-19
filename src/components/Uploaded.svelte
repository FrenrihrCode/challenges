<script>
  import { tick } from "svelte";

  export let url;
  export let name;
  let tooltipText = "Copiar enlace";
  let valueCopy = null;
  let areaDom;

  async function copy() {
    valueCopy = url;
    await tick();
    areaDom.focus();
    areaDom.select();
    let message = "Copying text was successful";
    try {
      const successful = document.execCommand("copy");
      tooltipText = "Enlace copiado";
      if (!successful) {
        message = "Copying text was unsuccessful";
      }
    } catch (err) {
      message = "Oops, unable to copy";
    }

    // we can notifi by event or storage about copy status
    console.log(message);
    valueCopy = null;
  }
</script>

<style>
  .Uploaded {
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
  .Uploaded img {
    max-width: 100%;
    border-radius: 20px;
    margin-bottom: 10px;
  }

  .tooltip {
    position: relative;
    display: flex;
    border: 1px solid #000000;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 30px;
    line-height: 30px;
    padding: 0 3px;
    background-color: white;
  }

  .Uploaded_url {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Uploaded_url p {
    white-space: nowrap;
    width: 240px;
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    border: 1px solid #000000;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  textarea {
    position: fixed;
    top: 0;
    left: 0;
    width: 2em;
    height: 2em;
    padding: 0;
    border: none;
    outline: none;
    box-shadow: none;
    opacity: 0;
  }

  svg {
    cursor: pointer;
  }

  .tooltip:hover {
    background-color: black;
  }

  .tooltip:hover svg {
    fill: white;
  }
</style>

<div class="Uploaded">
  <img src={url} alt={name} />
  <div class="Uploaded_url">
    <p>{url ? url : 'Ha ocurrido un error, revisa los log para saber más.'}</p>
    <div class="tooltip">
      <span class="tooltiptext" id="myTooltip">{tooltipText}</span>
      <svg
        on:click={copy}
        on:mouseout={() => {
          tooltipText = 'Copiar enlace';
        }}
        title="Copy to clipboard"
        class="octicon octicon-clippy"
        viewBox="0 0 14 16"
        version="1.1"
        width="21"
        height="25"
        aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z" />
      </svg>
    </div>
  </div>
  {#if valueCopy != null}
    <textarea bind:this={areaDom}>{valueCopy}</textarea>
  {/if}
</div>
