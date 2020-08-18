'use strict'
  //HTMLのタグをjsと繋げる
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する。
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element){
    　while (element.firstChild) { //result-area に、何かタグがある限りループ
        element.removeChild(element.firstChild);
    }
}

/**
 * 指定した要素に診断結果用のタグを表示する。
 * @param {HTMLElement} element HTMLの要素
 * @param {string} result  診断結果のテキスト
 */

function appendAssessmentResult(element , result){

  //result-areaにh3タグで”診断結果”という文字を表示
  const h3 = document.createElement('h3'); //h3タグを作る
  h3.innerText = '診断結果'; //h3タグに’診断結果’の文字列を設定
  element.appendChild(h3); //result-area に h3変数を設定

    //result-areaにpタグで診断結果を表示
    const p = document.createElement('p');
    p.innerText = result;
    element.appendChild(p);
}

/**
 * 指定した要素にツイートボタンを設定する。
 * @param {HTMLElement} element HTMLの要素
 * @param {string} result  ツイート本文
 */
function appendTweetButton(element,message) {
    const anchor = document.createElement('a');
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', message);
    anchor.innerText = 'Tweet #あなたのいいところ';
   
    element.appendChild(anchor);


    //scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    element.appendChild(script);
   //scriptタグをHTMLとして追加する
}


//入力欄でEnterキーを押したときに診断を実行
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick(); //下の関数assessment.onclickから持ってくる
    }
};

assessmentButton.onclick = function() { //無名関数

   let userName = userNameInput.value;
   if(userName.length === 0) {
       return;
   }

 //診断結果の表示
   //すでにある診断結果を削除
   removeAllChildren(resultDivided); //診断結果エリアの初期化
        //診断処理を実行して表示
    const result = assessment(userName); //resultを使えるようにする（tweet用）
   appendAssessmentResult(resultDivided,result );

    //Tweetボタンの表示
    removeAllChildren(tweetDivided); //tweetエリアの初期化
    appendTweetButton(tweetDivided,result);
}

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param　{string} userName ユーザーの名前
 * @return　{string} 診断結果
 */

 function assessment(userName){
     // userName(文字列)を数値(漢字だと5桁)に変換
  var userNameNumber = 0;
     for (let i = 0; i < userName.length; i++){
      userNameNumber += userName.charCodeAt(i)
     }
   // 5桁の数値を回答結果に範囲(0~15)に変換
  var answerNumber = userNameNumber  % answers.length;
   //診断結果
  var result = answers[answerNumber];
  
    return result.replace(/\{userName\}/g, userName);
    //TODO診断処理を後から書く
 }

 console.assert(
     assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。'
     //確認したいこと
     ,'診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
     //エラー時のコメント
     );

     //練習問題
     console.assert(
        assessment('太郎') === assessment('太郎')
        //確認したいこと
        ,'入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。'
        //エラー時のコメント
        );
   


/**
   //aタグを作り属性を設定する
   removeAllChildren(tweetDivided);
   const a = document.createElement('a');
   const href ='https://twitter.com/intent/tweet?button_hashtag='
   +encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw';
   a.setAttribute('href',href)
   a.className = 'tweeter-hashtag-button';
   a.setAttribute('date-text','診断結果の文章');
   a.innerText = 'Tweet #あなたのいいところ';
   //aタグをHTMLとして追加する
   tweetDivided.appendChild(a);
   
   */





/**
 *    const script = document.createElement('script');
   script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
   tweetDivided.appendChild(script);
 */
