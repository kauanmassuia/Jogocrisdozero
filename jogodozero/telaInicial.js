class telaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'telaInicial' });
    }

    preload() {
        // Carrega as imagens a serem usadas nessa cena
        this.load.image('cena', 'assets/perfilzero.png');
        this.load.image('play', 'assets/play.png');
    }

    create() {
        // Obtém as dimensões da tela
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        // Adiciona a imagem de fundo centralizada e dimensionada para cobrir toda a tela
        this.add.image(width / 2, height / 2, 'cena').setScale(Math.max(width / 800, height / 600));

        // Adiciona o botão centralizado na tela
        let botao = this.add.image(width / 2, height / 2, 'play').setScale(0.7);

        // Define o botão como interativo e define sua função ao clicar
        botao.setInteractive();
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('jogo');
        });
    }
}
