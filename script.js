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
        nbCouleurs: 8, // Nombre de couleurs disponible (Cf. Mastermind.couleurs || this.couleurs)
    },

    jeu: {
        tour: 0, // Tour actuel, sert de comparaison avec this.parametres.lines || Incrémentation après validation de la sélection
        colonne: 0, // Colonne utilisé actuellement
        selection: [], // Combinaison proposée par le joueur
        combinaisonSecrete: [], // Combinaison à deviner pour remporter la partie, générer ci-dessous
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
            }
            else {
                if (this.jeu.tour == this.parametres.lines - 1) { // Si plus d'essai
                    alert("PERDU");
                    this.restart();
                }
                else { // Sinon 
                    compteur = 1;
                    indexBons = []
                    for (i = 0; i < this.parametres.colonnes; i++) {
                        // On check les biens placés
                        if (this.jeu.combinaisonSecrete[i] == this.jeu.selection[i]) {
                            var nomHint = 'hint-';
                            nomHint += 10 - this.jeu.tour;
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
                                        nomHint += 10 - this.jeu.tour;
                                        nomHint += '-';
                                        nomHint += compteur;
                                        document.getElementById(nomHint).className = 'dot hint hintNearly';
                                        compteur++;
                                        // indexBons.push(i);
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

    restart() {
        document.location.href = "index.html";
    },

    getParameterColonne() {
        var col = document.getElementsByName('paraColonne');
        for (var i = 0; i < col.length; i++) {
            if (col[i].checked) {
                MasterMind.parametres.colonnes = parseInt(col[i].value, 10);
                break;
            }
        }
    },

    getParameterLigne() {
        var lig = document.getElementsByName('paraLigne');
        for (var i = 0; i < lig.length; i++) {
            if (lig[i].checked) {
                MasterMind.parametres.lines = parseInt(lig[i].value, 10);
                break;
            }
        }
    },

    getParameterCouleur() {
        var coul = document.getElementsByName('paraCoule');
        for (var i = 0; i < coul.length; i++) {
            if (coul[i].checked) {
                MasterMind.parametres.nbCouleurs = parseInt(coul[i].value, 10);
                break;
            }
        }
    }
}