var config = {
    type: Phaser.WEBGL, // defini o tipo de renderização
    width: 1200, // largura da tela do game
    height: 600, // altura da tela do game
    // ?? não sei exlpicar]
    fps: {
        target: 120, // Defina o valor desejado para a taxa de quadros
        forceSetTimeOut: true // Opcionalmente, forçar o uso do setTimeout
    },
    
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: false,
        transparent: false,
        // Habilitar V-Sync
        vSync: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true
        },
    
    },

    //defini as funções executadas no game
    scene: [telaInicial, jogo]
}


var game = new Phaser.Game(config); // defini a variável game e "guarda" nela as configurações que colocamos no config
var platforms; // variável para identificar o chão
var player; // variável para identifcar o boneco
var cursors; // variável para identificar o teclado


