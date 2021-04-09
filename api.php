<?php
error_reporting(E_ALL & ~ E_DEPRECATED & ~ E_USER_DEPRECATED & ~ E_NOTICE);
header("Access-Control-Allow-Origin: *"); //すべてのアクセスを許可

// フロントからのリクエストを取得する
$when =  $_REQUEST['when'];

// ShangriLa Anime API にリクエストを送る
$url = "https://api.moemoe.tokyo/anime/v1/master/".$when;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
$json = curl_exec($ch);
curl_close($ch);
$arr = json_decode($json, true);

// ShangriLa Anime API からのJsonを受け取る
if ($arr === NULL) {
        return;
}else{
        $json_count = count($arr);

        $twitter_account = array();
        $public_url = array();
        $title_short1 = array();
        $sex = array();
        $twitter_hash_tag = array();
        $title = array(); 
        
        for($i=$json_count-1;$i>=0;$i--){ 
            $twitter_account[] = $arr[$i]["twitter_account"];
            $public_url[] = $arr[$i]["public_url"];
            $title_short1[] = $arr[$i]["title_short1"];
            $sex[] = $arr[$i]["sex"];
            $twitter_hash_tag[] = $arr[$i]["twitter_hash_tag"];    
            $title[] = $arr[$i]["title"];
        }
}

 // ShangriLa Anime API からのデータをもとにスクレイピングする関数
function getImage( $url ){
    //OGPを取得したいURLを引数に取る

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
   
      $image = $node_image->item(0)->nodeValue;
      $description = $node_description->item(0)->nodeValue;

      $ch = curl_init(); // はじめます。

      // アクセスしたいURLをセット
      curl_setopt($ch, CURLOPT_URL, $url);
      // 取得結果を得るための設定
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      // $chにアクセスする
      // 実行
      $result = curl_exec($ch);
      // 成功していれば
      if($result != false){
          // その時の情報を取得
          $header = curl_getinfo($ch);
      }
      // 終了
      curl_close($ch);

      // 取得した情報からHTTPステータスコードを取り出す
      $status = $result ? $header['http_code'] : false;

      if(empty($image)){
        $image = "noimage";
      }
      // $imageが404で取得できなかったら
      if($status == 404){
        $image = "noimage";  
      }
      // $imageが相対パスか判定する // 相対パスだったらnoimage.jpg
      if(strpos($image,'http') === false){
        //'$image'のなかに'http'が含まれていない場合
        $image = "noimage";
      }
    return [$image, $description];
}



$json = array();

for($i=0;$i<=$json_count-1;$i++):
    list($image, $description) = getImage($public_url[$i]);

    array_push($json,array( 'title'=>$title[$i],
                            'description'=>$description,
                            'image'=>$image,
                            'title_short1'=>$title_short1[$i],
                            'sex'=>$sex[$i],
                            'public_url'=>$public_url[$i],
                            'twitter_account'=>$twitter_account[$i],
                            'twitter_hash_tag'=>$twitter_hash_tag[$i]
                        ));
endfor;
 
header("Content-Type: text/javascript; charset=utf-8");
print(json_encode($json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
exit();
// http://localhost/html/animeapi/api.php?when=2021/1
?>
