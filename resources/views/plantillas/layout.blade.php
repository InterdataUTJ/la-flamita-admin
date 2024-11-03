<!DOCTYPE html>
<html lang="es" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>La Flamita | @yield("titulo")</title>
    <script src="https://kit.fontawesome.com/58224c589b.js" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="/images/logo.png" type="image/png">

    {{-- Integrar el CSS y JS compilado para usar Tailwind y Flowbite --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full flex flex-col" style="background-color: #f4f4f4;">
    <x-navbar />
    <x-toast />

    @yield("contenido.arriba")

    <main class="grow w-11/12 max-w-screen-lg mx-auto p-5 box-border">
      @yield("contenido")
    </main>

</body>
</html>
