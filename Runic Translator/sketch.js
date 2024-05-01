function area_three(a,b,c){
    s = (a+b+c)/2.0;
    return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}

class line {
    constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.x4 = x4;
        this.y4 = y4;
        this.used = 0;
    }

    from_line(x1,y1,x2,y2,thickness){
        let slope = (y2-y1)/(x2-x1);
        let m=slope? (-1)/slope: 10**10;
        let r=Math.sqrt(1+m*m);
        let d=thickness/2;
        this.x1=x1+(d/r);
        this.y1=y1+((d*m)/r);
        this.x2=x2+(d/r);
        this.y2=y2+((d*m)/r);
        this.x3=x2-(d/r);
        this.y3=y2-((d*m)/r);
        this.x4=x1-(d/r);
        this.y4=y1-((d*m)/r);
        this.used = 0;
    }

    draw(){
        fill(220*this.used+30, 220*this.used+30, 220*this.used+30);
        quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
    }

    check(){
        let area = Math.abs((this.x1*this.y2 - this.x2*this.y1) + (this.x2*this.y3 - this.x3*this.y2) + (this.x3*this.y4 - this.x4*this.y3) + (this.x4*this.y1 - this.x1*this.y4))/2;
        let AXD = area_three(dist(mouseX,mouseY,this.x1,this.y1),dist(mouseX,mouseY,this.x4,this.y4),dist(this.x1,this.y1,this.x4,this.y4));
        let DXC = area_three(dist(mouseX,mouseY,this.x4,this.y4),dist(mouseX,mouseY,this.x3,this.y3),dist(this.x4,this.y4,this.x3,this.y3));
        let CXB = area_three(dist(mouseX,mouseY,this.x3,this.y3),dist(mouseX,mouseY,this.x2,this.y2),dist(this.x3,this.y3,this.x2,this.y2));
        let BXA = area_three(dist(mouseX,mouseY,this.x2,this.y2),dist(mouseX,mouseY,this.x1,this.y1),dist(this.x2,this.y2,this.x1,this.y1));
        this.used = this.used ^ area >= (AXD+DXC+CXB+BXA)*0.95;
    }

}

class letter{
    constructor(x,y,w,h,t){
        this.x = x;
        this.y = y;
        this.w = w/2;
        this.h = h/6;
        this.thick = t;

        let l1 = new line();
        l1.from_line(this.x+this.w,this.y-2*this.h,this.x,this.y-3*this.h,this.thick);
        let l2 = new line();
        l2.from_line(this.x,this.y-3*this.h,this.x-this.w,this.y-2*this.h,this.thick);
        let l3 = new line();
        l3.from_line(this.x-this.w,this.y-2*this.h,this.x-this.w,this.y,this.thick);
        let l4 = new line();
        l4.from_line(this.x-this.w,this.y+this.h,this.x-this.w,this.y+2*this.h,this.thick);
        let l5 = new line();
        l5.from_line(this.x-this.w,this.y+2*this.h,this.x,this.y+3*this.h,this.thick);
        let l6 = new line();
        l6.from_line(this.x,this.y+3*this.h,this.x+this.w,this.y+2*this.h,this.thick);
        this.outer = [l1,l2,l3,l4,l5,l6];

        let l7 = new line();
        l7.from_line(this.x,this.y-3*this.h,this.x,this.y-this.h,this.thick);
        let l8 = new line();
        l8.from_line(this.x,this.y-this.h,this.x-this.w,this.y-2*this.h,this.thick);
        let l9 = new line();
        l9.from_line(this.x,this.y-this.h,this.x+this.w,this.y-2*this.h,this.thick);
        let l10 = new line();
        l10.from_line(this.x,this.y+this.h,this.x-this.w,this.y+2*this.h,this.thick);
        let l11 = new line();
        l11.from_line(this.x,this.y+this.h,this.x+this.w,this.y+2*this.h,this.thick);
        let l12 = new line();
        l12.from_line(this.x,this.y+3*this.h,this.x,this.y+this.h,this.thick);
        this.inner = [l7,l8,l9,l10,l11,l12];

        this.inv = new line();
        this.inv.from_line(this.x-this.thick,this.y+this.h*3+this.thick*2,this.x+this.thick,this.y+this.h*3+this.thick*2,this.thick*2)

    }
    draw(){
        this.outer.forEach((i)=>i.draw());
        this.inner.forEach((i)=>i.draw());
        this.inv.draw();
        fill(255,255,255);
        rect(this.x-this.w*1.25,this.y,this.w*2.5,this.h/4);
        let middle = (this.inner[0].used || this.inner[1].used || this.inner[2].used) && (this.inner[3].used || this.inner[4].used || this.inner[5].used);
        fill(220*middle+30, 220*middle+30, 220*middle+30);
        rect(this.x-this.thick/2,this.y-this.h,this.thick,this.h);
    }
    check(){
        this.outer.forEach((i)=>i.check());
        this.inner.forEach((i)=>i.check());
        this.inv.check();
    }
}

class word{
    constructor(x,y,lw,lh,lt,len){
        this.letters = [];
        this.x = x;
        this.y = y;
        this.lw = lw;
        this.lh = lh;
        this.lt = lt;
        this.len = len;
        for(let i=0;i<len;i++){
            this.letters.push(new letter((this.x+this.lw*(1/2))+this.lw*i,this.y+this.lh*(1/2),this.lw,this.lh,this.lt))
        }
    }
    draw(){
        for(let i=0;i<this.len;i++){
            this.letters[i].draw();
        }
    }
    check(){
        for(let i=0;i<this.len;i++){
            this.letters[i].check();
        }
    }
}

let w1 = new word(10,10,100,200,15,6);
let w2 = new word(810,10,100,200,15,6);
let w3 = new word(10,510,100,200,15,6);
let w4 = new word(810,510,100,200,15,6);

let out = ["X","X","X","X"];

function setup() {
    createCanvas(1500, 800);
    stroke(0);
    textSize(24);
}

function draw() {
    background(0, 0, 0);
    w1.draw()
    w2.draw()
    w3.draw()
    w4.draw()
    
    out = display_words();
    fill(255,10,10);
    text(out[0], 20, 300);
    fill(10,255,10);
    text(out[1], 820, 300);
    fill(10,10,255);
    text(out[2], 20, 450);
    fill(255,100,255);
    text(out[3], 820, 450);
}

function mousePressed() {
    w1.check();
    w2.check();
    w3.check();
    w4.check();
}

function display_words(){
    let words = ipa_to_word(rune_word_to_ipa(w1));
    let words1, words2, words3, words4;
    if(words[0][0] == 0){
        words1 = "Exact match: " + words[0][1];
    } else {
        words1 = "Phonetic: " + rune_word_to_ipa(w1);
        words1 += "\nMost to least likely: " + words[0][1] + ", " + words[1][1] + ", " + words[2][1];
    }
    words = ipa_to_word(rune_word_to_ipa(w2));
    if(words[0][0] == 0){
        words2 = "Exact match: " + words[0][1];
    } else {
        words2 = "Phonetic: " + rune_word_to_ipa(w2);
        words2 += "\nMost to least likely: " + words[0][1] + ", " + words[1][1] + ", " + words[2][1];
    }
    words = ipa_to_word(rune_word_to_ipa(w3));
    if(words[0][0] == 0){
        words3 = "Exact match: " + words[0][1];
    } else {
        words3 = "Phonetic: " + rune_word_to_ipa(w3);
        words3 += "\nMost to least likely: " + words[0][1] + ", " + words[1][1] + ", " + words[2][1];
    }
    words = ipa_to_word(rune_word_to_ipa(w4));
    if(words[0][0] == 0){
        words4 = "Exact match: " + words[0][1];
    } else {
        words4 = "Phonetic: " + rune_word_to_ipa(w4);
        words4 += "\nMost to least likely: " + words[0][1] + ", " + words[1][1] + ", " + words[2][1];
    }

    return [words1,words2,words3,words4];

}

// function keyPressed(){
//     let words = ipa_to_word(rune_word_to_ipa(hello));
//     if(words[0][0] == 0){
//         console.log(words[0][1]);
//     } else {
//         console.log("Phonetic: " + rune_word_to_ipa(hello));
//         console.log("Most to least likely: " + words[0][1] + ", " + words[1][1] + ", " + words[2][1] + ", " + words[3][1] + ", " + words[4][1]);
//     }
// }

function rune_letter_to_ipa(l){
    let outer = 0;
    let inner = 0;

    for(let i=0;i<6;i++){
        inner += 2**i * l.inner[i].used;
        outer += 2**i * l.outer[i].used;
    }

    let results = {};
    results.inv = 0;

    switch(outer){
        case 15: results.outer = "æ"; break; //A
        case 51: results.outer = "ɑr"; break; //AR
        case 14: results.outer = "ɑ"; break; //AH
        case 2 : results.outer = "eɪ"; break; //AY
        case 60: results.outer = "ɛ"; break; //E
        case 62: results.outer = "i"; break; //EE
        case 46: results.outer = "ɪr"; break; //EER
        case 3 : results.outer = "ə"; break; //EH
        case 44: results.outer = "ɛr"; break; //ERE
        case 48: results.outer = "ɪ"; break; //I
        case 1 : results.outer = "aɪ"; break; //IE
        case 61: results.outer = "ər"; break; //IR
        case 63: results.outer = "oʊ"; break; //OH
        case 16: results.outer = "ɔɪ"; break; //OI
        case 31: results.outer = "u"; break; //OO
        case 28: results.outer = "ʊ"; break; //OU
        case 32: results.outer = "aʊ"; break; //OW
        case 47: results.outer = "ʊr"; break; //ORE
        default: results.outer = ""; break; //AW and UH
    }

    switch(inner){
        case 17: results.inner = "b"; break; //B
        case 34: results.inner = "ʧ"; break; //CH
        case 25: results.inner = "d"; break; //D
        case 44: results.inner = "f"; break; //F
        case 52: results.inner = "g"; break; //G
        case 49: results.inner = "h"; break; //H
        case 9 : results.inner = "ʤ"; break; //J
        case 21: results.inner = "k"; break; //K
        case 33: results.inner = "l"; break; //L
        case 24: results.inner = "m"; break; //M
        case 26: results.inner = "n"; break; //N
        case 63: results.inner = "ŋ"; break; //NG
        case 36: results.inner = "p"; break; //P
        case 37: results.inner = "r"; break; //R
        case 45: results.inner = "s"; break; //S
        case 62: results.inner = "ʃ"; break; //SH
        case 38: results.inner = "t"; break; //T
        case 39: results.inner = "θ"; break; //TH
        case 57: results.inner = "ð"; break; //TH
        case 19: results.inner = "v"; break; //V
        case 6 : results.inner = "w"; break; //W
        case 35: results.inner = "j"; break; //Y
        case 51: results.inner = "z"; break; //Z
        case 31: results.inner = "ʒ"; break; //ZH
        default: results.inner = ""; break; //unused
    }

    if(l.inv.used){
        results.inv = results.outer;
        results.outer = results.inner;
        results.inner = results.inv;
    }

    return results.inner + results.outer;
}

function ipa_to_word(ipa){
    // for(i of window.converts){
    //     if(ipa == i[1]){
    //         console.log(i[0]);
    //     }
    // }

    // get closest match function
    const levenshteinDistance = (s, t) => {
        // if (!s.length) return t.length;
        // if (!t.length) return s.length;
        const arr = [];
        for (let i = 0; i <= t.length; i++) {
          arr[i] = [i];
          for (let j = 1; j <= s.length; j++) {
            arr[i][j] =
              i === 0
                ? j
                : Math.min(
                    arr[i - 1][j] + 1,
                    arr[i][j - 1] + 1,
                    arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                  );
          }
        }
        return arr[t.length][s.length];
    };

    let storage = [];
    for(i of window.converts){
        storage.push([levenshteinDistance(ipa, i[1]),i[0]]);
    }
    storage.sort( (a,b)=>{
        return a[0] - b[0];
    });
    return storage.slice(0,5);
}

function rune_word_to_ipa(w){
    let results = "";
    for(let i=0;i<w.len;i++){
        results += rune_letter_to_ipa(w.letters[i]);
    }
    return results;
}