// Definição de variáveis
var player;
var espada;
var placar;
var pontuacao = 0;
var cursors;
var grama;

class jogo extends Phaser.Scene {
    constructor() {
        super({ key: 'jogo' });
    }

    preload() {
        // Carregamento dos assets
        this.load.image('background', 'assets/background.png');
        this.load.image('espada', 'assets/espada.png');
        this.load.image('grama', 'assets/grama.png');
        this.load.image('player', 'assets/player.png');
    }

    create() {
        // Adiciona o fundo de tela
        this.add.image(400, 300, 'background').setOrigin(0.5); // Define a origem no centro

        // Adiciona a grama como plataforma
        this.add.image(400, 787, 'grama').setScale(1.5).setOrigin(0.5); // Define a origem no centro

        // Adiciona o jogador
        player = this.physics.add.sprite(100, 500, 'player'); // Ajusta a posição inicial do jogador
        player.setScale(0.3);
        player.setCollideWorldBounds(true);

        // Adiciona as espadas
        espada = this.physics.add.group({
            key: 'espada',
            repeat: 9,
            setXY: { x: 80, y: 0, stepX: 80 }
        });

        espada.children.iterate(function(espada) {
            espada.setScale(0.7); // Aumenta o tamanho da espada
            espada.setCollideWorldBounds(true);
            espada.setBounce(0); // Remove o efeito de "quicar"
            espada.body.gravity.y = 300; // Aplica a gravidade às espadas
        });

        // Cria o placar
        placar = this.add.text(16, 16, 'Espada: 0/10', { fontSize: '32px', fill: '#000' });

        // Captura os inputs do teclado
        cursors = this.input.keyboard.createCursorKeys();

        // Configura a colisão entre o jogador e as espadas
        this.physics.add.collider(player, espada, coletarEspada, null, this);
    }

    update() {
        // Movimentação do jogador com as setas do teclado
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
        }

        // Habilidade de pular
        if (cursors.up.isDown && player.body.onFloor()) {
            player.setVelocityY(-400);
        }
    }

    // Função para coletar espada
    coletarEspada(player, espada) {
        espada.disableBody(true, true);
        pontuacao++;
        placar.setText('Espada: ' + pontuacao + '/10');

        // Criar duas novas espadas
        criarMaisEspada(2);
    }

    // Função para criar mais espadas
    criarMaisEspada(quantidade) {
        for (var i = 0; i < quantidade; i++) {
            var x = Phaser.Math.Between(0, 800); // Posição aleatória no eixo X
            var novaEspada = espada.create(x, 0, 'espada');
            novaEspada.setScale(0.7);
            novaEspada.setCollideWorldBounds(true);
            novaEspada.setBounce(0);
            novaEspada.body.gravity.y = 300; // Aplica a gravidade às novas espadas
        }
    }
}

// Configurações do jogo
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Aumenta a gravidade para o jogador cair corretamente
            debug: false
        }
    },
    scene: [jogo]
};

// Inicialização do jogo
var game = new Phaser.Game(config);
