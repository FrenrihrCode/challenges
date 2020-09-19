<style>
  .Footer {
    background: rgb(92, 93, 94);
    color: white;
    padding: 1.5em 0.8em;
    font-size: 13px;
    font-weight: 300;
  }
  .Footer-container {
    display: grid;
    grid-template-columns: minmax(auto, 1024px);
    justify-content: center;
    align-items: center;
  }
  .Footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Footer-svelte {
    display: flex;
    align-items: center;
  }
  .Footer-svelte img {
    margin: 0 0 0 0.5em;
  }
  @media (max-width: 769px) {
    .Footer {
      padding: 0.8em 0;
    }
    .Footer-content {
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

<footer class="Footer">
  <div class="Footer-container">
    <div class="Footer-content">
      <div class="Footer-copy">&copy; 2020 - Todos los derechos reservados</div>
      <div class="Footer-dev">
        Desarrollado por <a href="https://twitter.com/frenrihr_code" target="_blank" rel="noreferrer">@Frenrihr</a>
      </div>
      <div class="Footer-svelte">
        Proudly powered by Svelte <img src="svelte.png" alt="Svelte" />
      </div>
    </div>
  </div>
</footer>
