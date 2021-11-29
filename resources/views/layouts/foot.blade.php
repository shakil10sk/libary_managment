{{-- <footer>
    <div class="footer clearfix mb-0 text-muted">
        <div class="float-left">
            <p>2020 &copy; Voler</p>
        </div>
        <div class="float-right">
            <p>Crafted with <span class='text-danger'><i data-feather="heart"></i></span> by <a href="http://ahmadsaugi.com">Shakil hosasin</a></p>
        </div>
    </div>
</footer> --}}

</div>
</div>


	<script src="{{ asset('public/js/script.min.js') }}"></script>

	<script src="{{ asset('public/js/script.js') }}"></script>


	<script src="{{ asset('public/js/jquery-ui.js')}}"></script>

    <!-- add sweet alert js & css in footer -->
	<script src="{{ asset('public/js/sweetalert/sweetalert2.all.min.js')}}"></script>

	<script src="{{ asset('public/js/sweetalert/sweet-alert.init.min.js')}}"></script>


	{{-- this is for serverside datatable --}}
  	<script src="{{ asset('public/js/dataTables/jquery.dataTables.min.js') }}"></script>

	<script src="{{ asset('public/js/dataTables/dataTables.bootstrap4.min.js') }}"></script>

	<script src="{{ asset('public/js/dataTables/dataTables.responsive.min.js') }}"></script>

	<script src="{{ asset('public/js/dataTables/responsive.bootstrap4.min.js') }}"></script>

	<!-- buttons for Export datatable -->
	<script src="{{ asset('public/js/dataTables/button/dataTables.buttons.min.js') }}"></script>
	<script src="{{ asset('public/js/dataTables/button/buttons.bootstrap4.min.js') }}"></script>
	<script src="{{ asset('public/js/dataTables/button/buttons.print.min.js') }}"></script>
	<script src="{{ asset('public/js/dataTables/button/buttons.html5.min.js') }}"></script>
	<script src=" {{ asset('public/js/dataTables/button/buttons.flash.min.js') }}"></script>
	<script src="{{ asset('public/js/dataTables/button/pdfmake.min.js') }}"></script>
	<script src="{{ asset('public/js/dataTables/button/vfs_fonts.js') }}"></script>

	{{-- custom js --}}
	<script src="{{ asset('public/js/custom.js') }}"></script>




    <script src="{{ asset('public/assets/js/feather-icons/feather.min.js') }}"></script>
    <script src="{{ asset('public/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js') }}"></script>
    <script src="{{ asset('public/assets/js/app.js') }}"></script>

    <script src="{{ asset('public/assets/vendors/chartjs/Chart.min.js') }}"></script>
    <script src="{{ asset('public/assets/vendors/apexcharts/apexcharts.min.js') }}"></script>
    {{-- <script src="{{ asset('public/assets/js/pages/dashboard.js') }}"></script> --}}

    <script src="{{ asset('public/assets/js/main.js') }}"></script>

    @yield('js')
</body>
</html>
