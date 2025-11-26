<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
<?php

// POST ellenőrzése
if (!isset($_POST) || empty($_POST)) {
    echo "<h2><strong>Űrlap nem lett beküldve!</strong></h2>";
    echo '<a href="acc02g_urlap.html"><strong>Vissza az űrlapra.</strong></a>';
    exit;
}

// Adatok beolvasása
$nev        = $_POST["nev"]          ?? "";
$pin        = $_POST["pin"]          ?? "";
$fav_fruit  = $_POST["fav_fruit"]    ?? "";
$age        = $_POST["age"]          ?? "";
$feet_size  = $_POST["feet_size"]    ?? "";
$confidence = $_POST["confidence"]   ?? "";

// Hibák listája
$errors = [];

// Szerveroldali ellenőrzések
if (!preg_match('/^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű ]+$/u', $nev)) {
    $errors[] = "Hibás név! Csak betűk és szóköz engedett.";
}

if (!preg_match('/^[0-9]{4}$/', $pin)) {
    $errors[] = "Hibás PIN! A PIN pontosan 4 számjegyből állhat.";
}

// Eredmények
echo "<h2>HTML űrlap - Ellenőrzés</h2>";

if (!empty($errors)) {
    echo "<h3>Hibák:</h3><ul>";
    foreach ($errors as $hiba) {
        echo "<li><strong>$hiba</strong></li>";
    }
    echo "</ul>";
}

// Táblázatos kiírás
echo "<h3>Kapott adatok:</h3>";
echo "<table border='1' cellpadding='6'>";
echo "<tr><th>Mező</th><th>Érték</th></tr>";
echo "<tr><td>Név</td><td>$nev</td></tr>";
echo "<tr><td>PIN</td><td>$pin</td></tr>";
echo "<tr><td>Kedvenc gyümölcs</td><td>$fav_fruit</td></tr>";
echo "<tr><td>Életkor</td><td>$age</td></tr>";
echo "<tr><td>Lábméret</td><td>$feet_size</td></tr>";
echo "<tr><td>Önbizalom</td><td>$confidence</td></tr>";
echo "</table>";

// Adatmentés
$line = "$nev;$pin;$fav_fruit;$age;$feet_size;$confidence\n";
file_put_contents("neptunkod_adatok.txt", $line, FILE_APPEND);

?>
<br><br>
<a href="acc02g_urlap.html"><strong>Vissza az űrlapra.</strong></a>
</body>
</html>
