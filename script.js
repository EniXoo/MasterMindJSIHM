var MasterMind = {
    nom: 'MasterMind',

    couleurs: {
        1: '#000000', // Noir
        2: '#FFFFFF', // Blanc
        3: '#CC3333', // Rouge
        4: '#ff9600', // Orange
        5: '#fff000', // Jaune
        6: '#0005c2', // Bleu
        7: '#00d8d5', // Cyan
        8: '#8a05fa', // Violet
    },

    parametres: {
        lines: 10, // Lignes disponibles avant de perdre = Nombre d'essai pour trouver la combinaison secrète
        colonnes: 4, // Colonnes disponible = Longueur de la combinaison
        nbCouleurs: 6, // Nombre de couleurs disponible (Cf. Mastermind.couleurs || this.couleurs)
    },

    jeu: {
        tour: 0, // Tour actuel, sert de comparaison avec this.parametres.lines || Incrémentation après validation de la sélection
        colonne: 0, // Colonne utilisé actuellement
        selection: [], // Combinaison proposée par le joueur
        combinaisonSecrete: [], // Combinaison à deviner pour remporter la partie, générer ci-dessous
    },

    initialisation() {
        this.defineCombinaisonSecrete();
        this.drawGameBoard();
    },

    defineCombinaisonSecrete() { // Méthode définissant une combinaisonSecrete ( Pas si secrète que ça pour les malins (: )
        for (i = 0; i < this.parametres.colonnes; i++) { // Boucle : Longueur de la combinaison
            // On ajoute à la liste this.jeu.combinaisonSecrete un double compris entre 0 et 1 multiplié par le nombre de couleurs disponible
            // +1 car this.couleurs commence à 1
            this.jeu.combinaisonSecrete.push(parseInt(Math.random() * this.parametres.nbCouleurs) + 1);
        }
    },

    getColor(choix) {
        if (this.jeu.colonne < this.parametres.colonnes) {
            ((this.jeu).selection)[this.jeu.colonne] = choix;
            this.addColor(choix);
        }
        else {
            alert("Vous ne pouvez pas placer plus de " + MasterMind.parametres.colonnes + " couleurs");
        }
    },

    addColor(choix) {
        var nomId = 'dot-';
        nomId += this.parametres.lines - this.jeu.tour;
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
        if (this.jeu.colonne != 0) { // Si ligne pas vide
            this.jeu.selection.pop(); // On enlève le dernier élément de la liste selection
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
                this.reset();
            }
            else {
                if (this.jeu.tour == this.parametres.lines - 1) { // Si plus d'essai
                    alert("PERDU");
                    this.reset();
                }
                else { // Sinon 
                    compteur = 1;
                    indexBons = []
                    for (i = 0; i < this.parametres.colonnes; i++) {
                        // On check les biens placés
                        if (this.jeu.combinaisonSecrete[i] == this.jeu.selection[i]) {
                            var nomHint = 'hint-';
                            nomHint += this.parametres.lines - this.jeu.tour;
                            nomHint += '-';
                            nomHint += compteur;
                            document.getElementById(nomHint).className = 'dot hint hintOk';
                            indexBons.push(i);
                            compteur++;
                        }
                    }
                    for (i = 0; i < this.parametres.colonnes; i++) {
                        if (!(indexBons.includes(i))) {
                            for (j = 0; j < this.parametres.colonnes; j++) {
                                if (!(indexBons.includes(j))) {
                                    if (this.jeu.combinaisonSecrete[j] == this.jeu.selection[i]) {
                                        var nomHint = 'hint-';
                                        nomHint += this.parametres.lines - this.jeu.tour;
                                        nomHint += '-';
                                        nomHint += compteur;
                                        document.getElementById(nomHint).className = 'dot hint hintNearly';
                                        compteur++;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                //Enfin on passe au tour suivant
                this.jeu.tour += 1;
                this.jeu.colonne = 0;
            }
        }
    },

    recupererParametres() {
        this.getParameterColonne()
        this.getParameterCouleur();
        this.getParameterLigne();
        this.reset();
    },

    reset() {
        this.jeu.tour = 0;
        this.jeu.colonne = 0;
        this.jeu.selection = [];
        this.jeu.combinaisonSecrete = [];
        this.defineCombinaisonSecrete();
        this.drawGameBoard();
    },

    drawGameBoard() {
        this.drawGrid();
        this.drawColorSelection();
    },

    drawGrid() {
        document.getElementById('dot-container').innerHTML = "";
        for (i = 1; i <= this.parametres.lines; i++) {
            var line = document.createElement('div');
            var addHere = document.getElementById('dot-container');
            line.className = "ligne" + i;
            line.id = "ligne-" + i;
            addHere.appendChild(line);
            for (j = 1; j <= this.parametres.colonnes; j++) {
                var cell = document.createElement('div');
                var addHere2 = document.getElementById("ligne-" + i);
                cell.className = "dot";
                cell.id = "dot-" + i + "-" + j;
                addHere2.appendChild(cell);
            }
            for (j = 1; j <= this.parametres.colonnes; j++) {
                var hint = document.createElement('div');
                var addHere2 = document.getElementById("ligne-" + i);
                hint.className = "dot hint";
                hint.id = "hint-" + i + "-" + j;
                addHere2.appendChild(hint);
            }
        }
    },

    drawColorSelection() {
        document.getElementById('choice-container').innerHTML = "";
        for (i = 1; i <= this.parametres.nbCouleurs; i++) {
            var br = document.createElement('br');
            var el = document.createElement('div');
            var addHere = document.getElementById('choice-container');
            el.id = "dot-" + i;
            el.className = "dot dot" + i;
            el.setAttribute('onclick', this.nom + '.getColor(' + i + ');');
            addHere.appendChild(el);
            if (i == 4)
                addHere.appendChild(br);
        }
    },

    getParameterColonne() {
        this.parametres.colonnes = parseInt(document.getElementById('paramColonne').value);
    },

    getParameterLigne() {
        this.parametres.lines = parseInt(document.getElementById('paramLigne').value);
    },

    getParameterCouleur() {
        this.parametres.nbCouleurs = parseInt(document.getElementById('paramCouleur').value);
    },

    updateTextInput(valeur, cadre) {
        document.getElementById(cadre).value = valeur;
    },
}