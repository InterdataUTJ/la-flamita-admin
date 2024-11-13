@extends('plantillas.layout')

@section("titulo", "La Flamita")

@section("contenido.arriba")
{{-- Banner --}}
<div class="flex flex-col justify-center items-center w-full">
  <h3 class="text-white text-5xl font-extrabold bg-primary-500 w-full pt-10 pb-20 text-center">La Flamita</h3>
  <img src="/images/waves.svg" class="w-full select-none">
</div>
@endsection

@section("contenido")
<h2 class="text-center font-extrabold text-3xl mb-2">Menú</h2>
<section class="antialiased">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <!-- Heading & Filters -->
    <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
      <div class="flex items-center space-x-4">
        <button data-modal-toggle="filterModal" data-modal-target="filterModal" type="button" class="flex gap-2 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
          <i class="fa-solid fa-filter"></i>
          Filtros
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" class="flex gap-2 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
          <i class="fa-solid fa-arrow-up-z-a"></i>
          Ordenar
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div id="dropdownSort1" class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-placement="bottom">
          <ul class="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="sortDropdownButton">
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-primary-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">Nombre</a>
            </li>
            <li>
              <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-primary-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">Preio</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <dialog id="filterModal">
      <button autofocus onclick="document.getElementById('filterModal').close();">Close</button>
      <p>Prueba</p>
    </dialog>
    

    <!-- Products -->
    <div class="mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

      <x-menu.item id="1" nombre="Tacos de pastor" descuento="10" precio="22" descripcion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem ex deleniti iusto magnam. Animi molestiae fuga placeat cum, quia dolorum fugiat sequi eum saepe possimus, illo in quasi laboriosam!" cantidad="2" />
      
      <x-menu.item id="2" nombre="Tacos de bistec" descuento="10" precio="20" descripcion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem ex deleniti iusto magnam. Animi molestiae fuga placeat cum, quia dolorum fugiat sequi eum saepe possimus, illo in quasi laboriosam!" />
      
      <x-menu.item id="3" nombre="Tacos de bistec" precio="20" descripcion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem ex deleniti iusto magnam. Animi molestiae fuga placeat cum, quia dolorum fugiat sequi eum saepe possimus, illo in quasi laboriosam!" />
      
      <x-menu.item id="4" nombre="Tacos de bistec" descuento="10" precio="20" descripcion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem ex deleniti iusto magnam. Animi molestiae fuga placeat cum, quia dolorum fugiat sequi eum saepe possimus, illo in quasi laboriosam!" />
      
      <x-menu.item id="5" nombre="Tacos de bistec" precio="20" descripcion="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem ex deleniti iusto magnam. Animi molestiae fuga placeat cum, quia dolorum fugiat sequi eum saepe possimus, illo in quasi laboriosam!" />
      
      
    </div>
  </div>

</section>
@endsection