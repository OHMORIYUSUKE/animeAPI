<?php
// PHP json https://qiita.com/fantm21/items/603cbabf2e78cb08133e
error_reporting(E_ALL & ~ E_DEPRECATED & ~ E_USER_DEPRECATED & ~ E_NOTICE);

if(empty($_REQUEST['when'])){
  $year = "2021/1";
}else{
  $year = $_REQUEST['when'];
}

//2013/4~
$yearArray = array("2013","2014","2015","2016","2017","2018","2019","2020","2021");
$coolArry = array("1","2","3","4");

$url = "https://api.moemoe.tokyo/anime/v1/master/".$year;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
$json = curl_exec($ch);
curl_close($ch);
$arr = json_decode($json, true);


if ($arr === NULL) {
        return;
}else{
        $json_count = count($arr);

        $title_short2　= array();
        $twitter_account = array();
        $public_url = array();
        $title_short1 = array();
        $sex = array();
        $twitter_hash_tag = array();
        $id = array();
        $sequel = array();
        $created_at = array();
        $city_name = array();
        $cours_id = array();
        $title = array();
        $city_code = array();
        $title_short3 = array();
        $updated_at = array();
        
        for($i=$json_count-1;$i>=0;$i--){
            $title_short2[] = $arr[$i]["title_short2"];
            $twitter_account[] = $arr[$i]["twitter_account"];
            $public_url[] = $arr[$i]["public_url"];
            $title_short1[] = $arr[$i]["title_short1"];
            $sex[] = $arr[$i]["sex"];
            $twitter_hash_tag[] = $arr[$i]["twitter_hash_tag"];
            $id[] = $arr[$i]["id"];
            $sequel[] = $arr[$i]["sequel"];
            $created_at[] = $arr[$i]["created_at"];
            $city_name[] = $arr[$i]["city_name"];
            $cours_id[] = $arr[$i]["cours_id"];
            $title[] = $arr[$i]["title"];
            $city_code[] = $arr[$i]["city_code"];
            $title_short3[] = $arr[$i]["title_short3"];
            $updated_at[] = $arr[$i]["updated_at"];
        }
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>アニメで振り返ろう</title>

    <meta property="og:title" content="アニメで振り返ろう">
    <meta property="og:type" content="website">
    <meta property="og:description" content="今までのアニメを放送クール別に振り返ろう！">
    <meta property="og:url" content="http://utan.php.xdomain.jp/animeapi/">
    <meta property="og:image" content="https://github.com/OHMORIYUSUKE/Portfolio2/blob/main/images/face.png?raw=true">

    <meta name="twitter:card" content="summary_large_image">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="main.css" media="all">
</head>
<body>
<h3 id="main">
  アニメで振り返ろう
  <small class="text-muted">Let's look back on anime</small>
</h3>

<div id="main" class="main2">
  <div class="card">
    <div class="card-body">
    <h5>使い方</h5>
    <p>1. "選択してください"ボタンを押す。</p>
    <p>2. 振り返りたい [放送年 / 放送クール] を選択する。</p>
    <p>1期(冬),2期(春),3期(夏),4期(秋)</p>
      <select  id="sentaku" class="pullarchive" name="select" onChange="location.href=value;">
        <option value="#">選択してください</option>
        
        <?php for($i=0; $i <= count($yearArray)-1; $i++): ?>
          <?php for($t=0; $t <= count($coolArry)-1; $t++): ?>
            <option value="index.php?when=<?php print($yearArray[$i]); ?>/<?php print($coolArry[$t]); ?>"><?php print($yearArray[$i]); ?>/<?php print($coolArry[$t]); ?></option>
          <?php endfor; ?>
        <?php endfor; ?>
        </select>
      </section>

      <p><?php print("選択されている年 : ".htmlspecialchars($year, ENT_QUOTES)); ?></p>

    </div>
  </div>
</div>

<div id="main" class="row row-cols-1 row-cols-md-3 g-4">
<?php for($i=0;$i<=$json_count-1;$i++):?>
    <?php
    //OGPを取得したいURL
    $url = $public_url[$i];

    $ch = curl_init($url);// urlは対象のページ
      curl_setopt($ch, CURLOPT_HEADER, 0);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);// exec時に出力させない
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);// リダイレクト許可
      curl_setopt($ch, CURLOPT_MAXREDIRS, 5);// 最大リダイレクト数
      $html = curl_exec($ch);

      //文字コード変換 <- 重要(スクレイピングした際は必ず入れる)
      $html = mb_convert_encoding($html, 'HTML-ENTITIES', 'ASCII, JIS, UTF-8, SJIS');

    //DOMDocumentとDOMXpathの作成
    $dom = new DOMDocument;
    @$dom->loadHTML($html);
    $xpath = new DOMXPath($dom);
    //XPathでmetaタグのog:titleおよびog:imageを取得
    $node_image = $xpath->query('//meta[@property="og:image"]/@content');
    $node_description = $xpath->query('//meta[@property="og:description"]/@content');

      $imageOGP = $node_image->item(0)->nodeValue;
      $descriptionOGP = $node_description->item(0)->nodeValue;

      //画像が404かを判定する
      // アクセスしたいURL
      $url = $imageOGP;

      $ch = curl_init(); // はじめます。

      // アクセスしたいURLをセット
      curl_setopt($ch, CURLOPT_URL, $url);
      // 取得結果を得るための設定
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      // 実行
      $result = curl_exec($ch);

      // 成功していれば
      if($result != false){
          // その時の情報を取得
          $header = curl_getinfo($ch);
      }
      // 終わります。
      curl_close($ch);

      // 取得した情報からHTTPステータスコードを取り出します。
      $status = $result ? $header['http_code'] : false;

      // 結果を出力します
      if(empty($imageOGP)){
        $imageOGP = "noimage.jpg";
        $imageOGPalt = "画像が取得できませんでした";
      }else{
        $imageOGPalt = "画像";
      }
      // $imageOGPが404で取得できなかったら
      if($status == 404){
        $imageOGP = "noimage.jpg";
        $imageOGPalt = "(404)画像が取得できませんでした";
      }else{
        $imageOGPalt = "画像";
      }
      // $imageOGPが相対パスか判定する // 相対パスだったらnoimage.jpg
      if(strpos($imageOGP,'http') === false){
        //'$imageOGP'のなかに'http'が含まれていない場合
        $imageOGP = "noimage.jpg";
        $imageOGPalt = "(404)画像が取得できませんでした";
      }
    ?>
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title"><?php print($title[$i]); ?></h5>
    <h6 class="card-subtitle mb-2 text-muted"><?php print($title_short1[$i]); ?></h6>
    <img src="<?php print($imageOGP); ?>" alt="<?php print($imageOGPalt); ?>">
    <p><?php print($descriptionOGP); ?></p>
    <?php 
    if($sex[$i] == 0){
            $targetSex = "男性向け";
        }else{
            $targetSex = "  女性向け";
        }
    ?>
    <p class="card-text"><?php print($targetSex); ?>
        <br>
        <a class="twitter-timeline twitter-timeline-error" href="https://twitter.com/hashtag/<?php print($twitter_hash_tag[$i]); ?>" data-widget-id="803414029662175232" data-twitter-extracted-i1615482177602952635="true" target="_blank" rel="noopener noreferrer"><?php print("#".$twitter_hash_tag[$i]); ?></a>のツイート
        <br>
    </p>
    <a href="<?php print($public_url[$i]); ?>" target="_blank" rel="noopener noreferrer" class="card-link">公式サイト</a>
    <a href="https://twitter.com/<?php print($twitter_account[$i]); ?>"  target="_blank" rel="noopener noreferrer" class="card-link">公式twitterアカウント</a>
    
    <small class="text-muted">
        <?php
        print("データの作成日時 : ".$created_at[$i]);
        print("<br>");
        print("データの更新日時 : ".$updated_at[$i]);
        ?>
    </small>
    
  </div>
</div>
<?php    
endfor;
?>
</div>

<footer class="footer">
  <div class="container">
    <p class="text-muted">Copyright © 2021 u-tan All Rights Reserved.<br>
    <a href="https://github.com/Project-ShangriLa/sora-playframework-scala">ShangriLa Anime APIを利用しています。</a>    
</p>
  </div>
</footer>
</body>
</html>
