<template>
<ul data-v-57292d1e="" class="c-sidebar-nav h-100 ps" style="position: relative;">
   <li v-if="$ability.can('read', 'Dashboard')" class="c-sidebar-nav-item" data-v-57292d1e="">
      <a href="/dashboard" aria-current="page" class="router-link-exact-active c-active c-sidebar-nav-link" target="_self">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-sidebar-nav-icon">
            <path fill="var(--ci-primary-color, currentColor)" d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z" class="ci-primary"></path>
            <rect width="32" height="32" x="80" y="264" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="32" x="240" y="128" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="32" x="136" y="168" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="32" x="400" y="264" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <path fill="var(--ci-primary-color, currentColor)" d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z" class="ci-primary"></path>
         </svg>
         <!----> Dashboard <!---->
      </a>
   </li>
   <li class="c-sidebar-nav-item" data-v-57292d1e="">
      <a href="/customers" class="c-sidebar-nav-link" target="_self">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-sidebar-nav-icon">
            <path fill="var(--ci-primary-color, currentColor)" d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z" class="ci-primary"></path>
            <path fill="var(--ci-primary-color, currentColor)" d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z" class="ci-primary"></path>
         </svg>
         <!----> Customers <!---->
      </a>
   </li>
   <li class="c-sidebar-nav-item" data-v-57292d1e="">
      <a href="/insurance" class="c-sidebar-nav-link" target="_self">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-sidebar-nav-icon">
            <path fill="var(--ci-primary-color, currentColor)" d="M247.759,14.358,16,125.946V184H496V125.638ZM464,152H48v-5.946L248.241,49.642,464,146.362Z" class="ci-primary"></path>
            <path fill="var(--ci-primary-color, currentColor)" d="M16,496H496V392H16Zm32-72H464v40H48Z" class="ci-primary"></path>
            <rect width="32" height="160" x="72" y="208" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="160" x="408" y="208" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="160" x="184" y="208" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="160" x="296" y="208" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
         </svg>
         <!----> Insurance <!---->
      </a>
   </li>
   <li class="c-sidebar-nav-item" data-v-57292d1e="">
      <a href="/supplier" class="c-sidebar-nav-link" target="_self">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-sidebar-nav-icon">
            <path fill="var(--ci-primary-color, currentColor)" d="M459.26,96,328,225.7V96H293.475L168,223.267V16H16V496H496V96ZM464,464H48V48h88V264h36.778L296,139.018V264h38.764L464,136.3Z" class="ci-primary"></path>
            <polygon fill="var(--ci-primary-color, currentColor)" points="136 328 136 336 168 336 168 328 168 304 136 304 136 328" class="ci-primary"></polygon>
            <rect width="32" height="32" x="136" y="376" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <polygon fill="var(--ci-primary-color, currentColor)" points="216 328 216 336 248 336 248 328 248 304 216 304 216 328" class="ci-primary"></polygon>
            <rect width="32" height="32" x="216" y="376" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <polygon fill="var(--ci-primary-color, currentColor)" points="296 328 296 336 328 336 328 328 328 304 296 304 296 328" class="ci-primary"></polygon>
            <rect width="32" height="32" x="296" y="376" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="32" x="376" y="304" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="32" x="376" y="376" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
         </svg>
         <!----> Supplier <!---->
      </a>
   </li>
   <li class="c-sidebar-nav-item" data-v-57292d1e="">
      <a href="/role_permission" class="c-sidebar-nav-link" target="_self">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-sidebar-nav-icon">
            <path fill="var(--ci-primary-color, currentColor)" d="M473.605,88.081c-1.352-.137-135.958-14.259-199.218-68.251L269.9,16H242.1l-4.488,3.83C174.464,73.727,39.744,87.944,38.4,88.081L24,89.532V104c0,89.133,14.643,165.443,43.523,226.813,38.105,80.973,100.1,133.669,184.267,156.623l4.21,1.148,4.21-1.148c84.165-22.954,146.162-75.65,184.267-156.623C473.357,269.443,488,193.133,488,104V89.532ZM455.87,118.113q-.237,12.789-.948,25.887H272V57.915C331.921,97.482,421.024,113.237,455.87,118.113ZM272,320H414.266A288.233,288.233,0,0,1,390.9,360H272Zm0-32V248H439.9a402.662,402.662,0,0,1-13.236,42.884V288Zm0-72V176H452.378c-1.4,13.307-3.256,26.682-5.639,40ZM56.13,118.113c34.846-4.876,123.949-20.631,183.87-60.2V450.224C94.012,398.389,58.492,245.387,56.13,118.113ZM272,450.224V392h92.347C340.049,416.7,309.708,436.836,272,450.224Z" class="ci-primary"></path>
         </svg>
         <!----> Users, Roles &amp; Permissions <!---->
      </a>
   </li>
   <li class="c-sidebar-nav-dropdown" data-v-57292d1e="">
      <a class="c-sidebar-nav-dropdown-toggle">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-sidebar-nav-icon">
            <path fill="var(--ci-primary-color, currentColor)" d="M432,64H16V384H432ZM400,352H48V96H400Z" class="ci-primary"></path>
            <polygon fill="var(--ci-primary-color, currentColor)" points="464 144 464 416 96 416 96 448 496 448 496 144 464 144" class="ci-primary"></polygon>
            <path fill="var(--ci-primary-color, currentColor)" d="M224,302.46c39.7,0,72-35.137,72-78.326s-32.3-78.326-72-78.326-72,35.136-72,78.326S184.3,302.46,224,302.46Zm0-124.652c22.056,0,40,20.782,40,46.326s-17.944,46.326-40,46.326-40-20.782-40-46.326S201.944,177.808,224,177.808Z" class="ci-primary"></path>
            <rect width="32" height="176" x="80" y="136" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
            <rect width="32" height="176" x="336" y="136" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
         </svg>
         <!----> Sales 
      </a>
      <ul class="c-sidebar-nav-dropdown-items">
         <li class="c-sidebar-nav-item" gate="monitoring_access">
            <a href="/sales/monitoring" class="c-sidebar-nav-link" target="_self">
               <!----><!----> Monitoring <!---->
            </a>
         </li>
         <li class="c-sidebar-nav-item" gate="billing_statement_access">
            <a href="/sales/invoices" class="c-sidebar-nav-link" target="_self">
               <!----><!----> Billing Statement <!---->
            </a>
         </li>
         <li class="c-sidebar-nav-item" gate="job_order_access">
            <a href="/sales/job-order" class="c-sidebar-nav-link" target="_self">
               <!----><!----> Job Order <!---->
            </a>
         </li>
         <li class="c-sidebar-nav-item" gate="estimate_access">
            <a href="/sales/estimates" class="c-sidebar-nav-link" target="_self">
               <!----><!----> Estimates <!---->
            </a>
         </li>
         <li class="c-sidebar-nav-item" gate="payment_access">
            <a href="/sales/payments" class="c-sidebar-nav-link" target="_self">
               <!----><!----> Payments <!---->
            </a>
         </li>
      </ul>
   </li>
   <li class="c-sidebar-nav-dropdown" data-v-57292d1e="">
      <a class="c-sidebar-nav-dropdown-toggle">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-sidebar-nav-icon">
            <polygon fill="var(--ci-primary-color, currentColor)" points="376 160 376 192 441.372 192 252 381.373 180 309.373 76.686 412.686 99.314 435.314 180 354.627 252 426.627 464 214.628 464 280 496 280 496 160 376 160" class="ci-primary"></polygon>
            <polygon fill="var(--ci-primary-color, currentColor)" points="48 104 16 104 16 496 496 496 496 464 48 464 48 104" class="ci-primary"></polygon>
         </svg>
         <!----> Reports 
      </a>
      <ul class="c-sidebar-nav-dropdown-items">
         <li class="c-sidebar-nav-item" gate="sales_report_access">
            <a href="/report/sales" class="c-sidebar-nav-link" target="_self">
               <!----><!----> Sales <!---->
            </a>
         </li>
      </ul>
   </li>
   <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
      <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
   </div>
   <div class="ps__rail-y" style="top: 0px; right: 0px;">
      <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
   </div>
</ul>
</template>
<script>
export default {
}
</script>