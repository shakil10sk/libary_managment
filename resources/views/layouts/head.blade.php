<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="path" content="{{ url('/') }}">

    <title>@yield('title')</title>

    <link rel="stylesheet" href="{{ asset('public/assets/css/bootstrap.css') }}">

    <link rel="stylesheet" href="{{ asset('public/assets/vendors/chartjs/Chart.min.css') }}">

    <link rel="stylesheet" href="{{ asset('public/assets/vendors/perfect-scrollbar/perfect-scrollbar.css') }}">
    <link rel="stylesheet" href="{{ asset('public/assets/css/app.css') }}">
    <link rel="shortcut icon" href="{{ asset('public/assets/images/favicon.svg" type="image/x-icon') }}">

    <script src="{{asset('public/js/jquery.js')}}"></script>
</head>
<body>
