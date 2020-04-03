var MasterMind = {
    nom: 'MasterMind',

    couleurs: {
        1: '#000000', // noir
        2: '#FFFFFF', // blanc
        3: '#CC3333', // rouge
        4: '#ff9600', // orange
        5: '#fff000', // jaune
        6: '#0005c2', // bleu
        7: '#00d8d5', // cyan
        8: '#8a05fa', // violet
    },

    parametres: {
        lines: 10, // lignes disponibles pour arriver au résultat
        colonnes: 4, // nb de billes à deviner.
        nbCouleurs: 8, // couleurs disponibles
    },

    jeu: {
        tour: 0, // tour en cours
        colonne: 0, // colonne utilisé actuellement
        selection: [], // Combinaison proposée par le joueur
        combinaisonSecrete: [], // Combinaison à deviner pour remporter la partie
    },

    defineCombinaisonSecrete() {
        for (i = 0; i < this.parametres.colonnes; i++) {
            this.jeu.combinaisonSecrete.push(getRandomInt(this.parametres.nbCouleurs));
        }
    },

    resetPartie() {
        this.jeu[tour] = 0;
        this.jeu[colonne] = 0;
    },

    getColor(choix) {
        if (this.jeu.colonne < this.parametres.colonnes) {
            ((this.jeu).selection)[this.jeu.colonne] = choix;
            this.addColor(choix);
        }
        else {
            alert("STOP IT RIGHT NOW BIATCH$");
        }
    },

    addColor(choix) {
        var nomId = 'dot-';
        nomId += 10 - this.jeu.tour;
        nomId += '-';
        nomId += this.jeu.colonne + 1;
        if (choix == 0) { // Sert pour réinitialiser la dernière case
            var nomClasse = 'dot'
            document.getElementById(nomId).className = nomClasse;
        }
        else {
            var nomClasse = 'dot dot';
            nomClasse += choix;
            document.getElementById(nomId).className = nomClasse;
            this.jeu.colonne += 1;
        }
    },

    clearLast() {
        if (this.jeu.colonne != 0) {
            this.jeu.selection.pop();
            this.jeu.colonne = this.jeu.colonne - 1;
            this.addColor(0);
        }
    },

    checkProposition() {
        if (this.jeu.colonne != this.parametres.colonnes) { // Si champs de proposition incomplet
            alert("Il manque des couleurs");
        }
        else {
            if (JSON.stringify(this.jeu.combinaisonSecrete) == JSON.stringify(this.jeu.selection)) { // Comparaison de la proposition et de la combinaison secrète
                alert("Gagné");
            }
            else {
                if (this.jeu.tour == this.parametres.lines - 1) { // Si plus d'essai
                    alert("PERDU");
                }
                else { // Sinon on passe au tour suivant
                    this.jeu.tour += 1;
                    this.jeu.colonne = 0;
                }
            }
        }
    }
}