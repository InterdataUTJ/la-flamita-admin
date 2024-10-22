<!DOCTYPE html>
<html lang="es" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>La Flamita | @yield("titulo")</title>

    <link rel="shortcut icon" href="/images/logo.png" type="image/png">

    {{-- Integrar el CSS y JS compilado para usar Tailwind y Flowbite --}}
    @vite(['resources/css/app.css','resources/js/app.js'])
</head>
<body class="h-full flex flex-col">
    <x-navbar />

    <main class="grow w-11/12 max-w-screen-lg mx-auto p-5">
      @yield("contenido")
    </main>

</body>
</html>
