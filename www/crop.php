<?php
include 'ImageResize.php';
use \Eventviva\ImageResize;

if($_GET["action"] == "crop"){
    crop();
}else if($_GET["action"] == "save"){
    save_image();

}else if($_GET["action"] == "rotate"){
    rotate();
}
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
function save_image(){
    $rand = generateRandomString();
    $imgUrl = $_GET["imgUrl"];
    if(exif_imagetype($imgUrl) == 2){
        $img_name = "img/". $rand .".jpg";
    }else if (exif_imagetype($imgUrl) == 3){
        $img_name = "img/". $rand .".png";
    }
    

    $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    
    $url = "http://$_SERVER[HTTP_HOST]/iaditor/www/" . $img_name;

    $image = new ImageResize($imgUrl);
    //$image->resizeToHeight(1500);
    $image->save($img_name);    
    $path = realpath('img/');//note the .
      

    echo $url;

}
function rotate(){
    $angle = $_GET["angle"];
    $imgUrl = $_GET["imgUrl"];
    $path_info = pathinfo($imgUrl);
    $file_name ="img/". $path_info["filename"] . "." . $path_info["extension"] ;
    if(exif_imagetype($imgUrl) == 2){      
        $src = imagecreatefromjpeg($imgUrl);
    }else if (exif_imagetype($imgUrl) == 3){
        $src = imagecreatefrompng($imgUrl);  
    }        
    $rotate = imagerotate($src, $angle, 0);
    //and save it on your server...
    imagejpeg ( $rotate , $file_name , 100  );
    
    $url = "http://$_SERVER[HTTP_HOST]/iaditor/www/" . $file_name;  
    echo $angle;
}
function crop(){
    //echo "cropping";
    $rand = generateRandomString();
    $imgUrl = $_GET["imgUrl"];
    $y = $_GET["y"];
    $x = $_GET["x"];
    $height = $_GET["height"];
    $angle = $_GET["angle"];
    $image = new ImageResize($imgUrl);
    $image->resizeToHeight($height);
    $image->save("img/" . basename($imgUrl));    

    if(exif_imagetype($imgUrl) == 2){      
        $src = imagecreatefromjpeg($imgUrl);
    }else if (exif_imagetype($imgUrl) == 3){
        $src = imagecreatefrompng($imgUrl);  
    }
//    $rotatedImage = imagerotate($src,$angle * -1,0);
//    $src = $rotatedImage;
    $dest = imagecreatetruecolor(320, 568);
    //imagecopy($dest, $src, 0, 0, abs($y), abs($x),320, 568);
    imagecopy($dest, $src, 0, 0, abs($y), abs($x),320, 568);

    // Output and free from memory
    //header('Content-Type: image/gif');
    //imagegif($dest);
    $img_name="img/cropped_". basename($imgUrl);
    //$img_name="img/". $rand . ".jpg";
    $url = "http://$_SERVER[HTTP_HOST]/iaditor/www/" . $img_name;

    imagejpeg ( $dest , $img_name , 100  );
    
    imagedestroy($dest);
    imagedestroy($src);
    echo $url;    
}
// Create image instances
?>