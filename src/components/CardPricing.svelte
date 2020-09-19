<script>
  export let pricing;
  export let title;
  export let features = [];
  export let isMain = false;
</script>

<style>
  .Card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    padding: 20px;
    margin: 3px;
    font-weight: 700;
  }
  .Card.noFill {
    background-color: white;
    color: black;
  }
  .Card.fill {
    background: linear-gradient(0.33turn, #b9beff, #6c6fdf);
    padding: 40px 20px;
    color: white;
  }
  .feature {
    margin: 10px 0;
    font-size: 13px;
  }
  .line {
    width: 100%;
    height: 0.3px;
    opacity: 0.5;
  }
  .line.black {
    background-color: lightgrey;
  }
  .line.white {
    background-color: white;
  }
  button {
    width: 100%;
    border-radius: 5px;
    border-color: transparent;
    font-size: 14px;
    padding: 10px 0;
    text-transform: uppercase;
    cursor: pointer;
    border-style: solid;
    margin-top: 20px;
    outline: none;
  }
  button.colorFill {
    color: white;
    background: linear-gradient(to right, #b9beff, #6c6fdf);
  }
  button.colorNoFill {
    color: #6c6fdf;
    background: white;
  }
  button.colorFill:hover,
  button.colorFill:active {
    background: none;
    border-color: #6c6fdf;
    color: #6c6fdf;
    border-style: solid;
  }
  button.colorNoFill:hover,
  button.colorNoFill:active {
    background: none;
    border-color: white;
    color: white;
  }
  .pricing {
    font-size: 54px;
    margin: 0 0 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pricing span {
    font-size: 32px;
  }
  h3 {
    font-weight: 700;
    font-size: 15px;
  }
</style>

<div class="Card {isMain ? 'fill' : 'noFill'}">
  <h3>{title}</h3>
  <p class="pricing"><span>$</span>{pricing}</p>
  <div class="line {isMain ? 'white' : 'black'}" />
  {#each features as feature}
    <p class="feature">{feature}</p>
    <div class="line {isMain ? 'white' : 'black'}" />
  {/each}
  <button class={isMain ? 'colorNoFill' : 'colorFill'}>Learn more</button>
</div>
