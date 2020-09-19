<?php
header('Content-Type: application/javascript');
echo "myMedia = {";

$dir    = './Comics';
$scan = scandir($dir );
foreach($scan as $file) {
   if (is_dir("$dir/$file")) {
      if ($file!="."&&$file!="..") {
        $directory = "$dir/$file";
        $files = scandir($directory);
        sort($files);
        $subcomics = array();
        $volume0=false;
        echo "\"".$file."\": [{\"Volumes\": [";
        foreach($files as $sub) {
            if ($sub!="."&&$sub!="..") {
                if (is_numeric($sub))
                {
                    $comicdir = "$dir/$file/$sub";
                    $comicfiles = preg_grep('~\.(jpeg|jpg|png)$~', scandir($comicdir));
                    $num_files = count($comicfiles);
                    if (!is_dir("$dir/$file/0")&&$volume0==false) {
                        echo "{ \"name\": \"\", \"volume\": 0, \"Series\": \"".$file."\", \"pages\": 0, \"currentpage\": 1, \"cover\": 0 },";
                        $volume0=true;
                    }
                    echo "{ \"name\": \"\", \"volume\": ".$sub.", \"Series\": \"".$file."\", \"pages\": ".$num_files.", \"currentpage\": 1, \"cover\": 0 },";  
                    if(!file_exists("./Thumb/Comics/$file/$sub/1_thumb.jpg"))
                    {
                        for ($i=1; $i <= $num_files; $i++) { 
                            if (file_exists("$dir/$file/$sub/".$i.".png"))
                            {
                                $original = imagecreatefrompng("$dir/$file/$sub/".$i.".png");
                                list($width, $height) = getimagesize("$dir/$file/$sub/".$i.".png");
                            }
                            elseif (file_exists("$dir/$file/$sub/".$i.".jpg")) {
                                $original = imagecreatefromjpeg("$dir/$file/$sub/".$i.".jpg");
                                list($width, $height) = getimagesize("$dir/$file/$sub/".$i.".jpg");
                            }
                            $resized = imagecreatetruecolor(162, 243);
                            imagecopyresampled($resized, $original, 0, 0, 0, 0, 162, 243, $width, $height);
                            if (!is_dir("./Thumb/Comics/$file/$sub/")) {
                                mkdir("./Thumb/Comics/$file/$sub/", 0755, true);
                            }
                            imagejpeg($resized, "./Thumb/Comics/$file/$sub/".$i."_thumb.jpg");
                            imagedestroy($original);
                            imagedestroy($resized);
                        }
                    }  
                }
                else {
                    array_push($subcomics, $sub);
                }
            }
        }
        echo "],}";
        $volume0=false;
        if (count($subcomics)>0)
        {
            echo ",{\"Sub\": [{";
            foreach($subcomics as $sub) {
                $sub_directory = "$dir/$file/$sub";
                $sub_files = scandir($sub_directory);
                echo "\"".$sub."\":[";
                if (!is_dir("$dir/$file/0")&&$volume0==false) {
                    echo "{ \"name\": \"\", \"volume\": 0, \"Series\": \"".$file."\", \"pages\": 0, \"currentpage\": 1, \"cover\": 0 },";
                    $volume0=true;
                }
                foreach($sub_files as $sub_volume) {
                    if ($sub_volume!="."&&$sub_volume!="..") {
                        $comicdir = "$dir/$file/$sub/$sub_volume";
                        $comicfiles = preg_grep('~\.(jpeg|jpg|png)$~', scandir($comicdir));
                        $num_files = count($comicfiles);
                        echo "{ \"name\": \"\", \"volume\": ".$sub_volume.", \"Series\": \"".$sub."\", \"pages\": ".$num_files.", \"currentpage\": 1, \"cover\": 0 },";    
                        if(!file_exists("./Thumb/Comics/$file/$sub/$sub_volume/1_thumb.jpg"))
                        {
                            for ($i=1; $i <= $num_files; $i++) { 
                                if (file_exists("$dir/$file/$sub/$sub_volume/".$i.".png"))
                                {
                                    $original = imagecreatefrompng("$dir/$file/$sub/$sub_volume/".$i.".png"); 
                                    list($width, $height) = getimagesize("$dir/$file/$sub/$sub_volume/".$i.".png");
                                }
                                elseif (file_exists("$dir/$file/$sub/$sub_volume/".$i."jpg")) {
                                    $original = imagecreatefromjpeg("$dir/$file/$sub/$sub_volume/".$i.".jpg"); 
                                    list($width, $height) = getimagesize("$dir/$file/$sub/$sub_volume/".$i.".jpg");
                                }
                                $resized = imagecreatetruecolor(162, 243);
                                imagecopyresampled($resized, $original, 0, 0, 0, 0, 162, 243, $width, $height);
                                if (!is_dir("./Thumb/Comics/$file/$sub/$sub_volume/")) {
                                    mkdir("./Thumb/Comics/$file/$sub/$sub_volume/", 0755, true);
                                }
                                imagejpeg($resized, "./Thumb/Comics/$file/$sub/$sub_volume/".$i."_thumb.jpg");
                                imagedestroy($original);
                                imagedestroy($resized);
                            }
                        }  
                    }
                }
                echo "],";
            }
            echo "}]}";
        }
        echo "],";
      }
   }
}
echo "}";
?>
