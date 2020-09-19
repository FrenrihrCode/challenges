<script>
  import CardPricing from "../components/CardPricing.svelte";

  const feature1 = ["200 GB Storage", "1 Users allowed", "Send up to 2 GB"];
  const feature2 = ["500 GB Storage", "2 Users allowed", "Send up to 4 GB"];
  const feature3 = ["1 TB Storage", "4 Users allowed", "Send up to 6 GB"];
  let pricing1 = 9.99;
  let pricing2 = 19.99;
  let pricing3 = 29.99;
  let yearPromo = false;
</script>

<style>
  .Pricing {
    background-color: #f7f7ff;
    padding: 2em;
    text-align: center;
  }

  .Switch_container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 0 10px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #b9beff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #6c6fdf;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #6c6fdf;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .Card_container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .Switch_container p {
    font-size: 18px;
    font-weight: 300;
  }
</style>

<div class="Pricing">
  <div class="Princing_header">
    <h3>Componente Precios elaborado en Svelte</h3>
  </div>
  <div class="Princing_content">
    <div class="Title">
      <h1>Nuestros Precios</h1>
    </div>
    <div class="Switch_container">
      <p>Mensual</p>
      <label class="switch">
        <input type="checkbox" bind:checked={yearPromo} />
        <span class="slider round" />
      </label>
      <p>Anual</p>
    </div>
    <div class="Card_container">
      <CardPricing pricing={yearPromo ? pricing1*11 : pricing1} title={'Basic'} features={feature1} />
      <CardPricing
        pricing={yearPromo ? pricing2*11 : pricing2}
        title={'Proffesional'}
        features={feature2}
        isMain={true} />
      <CardPricing pricing={yearPromo ? pricing3*11 : pricing3} title={'Enterprice'} features={feature3} />
    </div>
  </div>
</div>
