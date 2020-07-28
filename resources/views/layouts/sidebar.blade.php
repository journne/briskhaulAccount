<!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">

    <div class="h-100">

        <div class="user-wid text-center py-4">
            <div class="user-img">
                <img src="/images/users/avatar-2.jpg" alt="" class="avatar-md mx-auto rounded-circle">
            </div>

            <div class="mt-3">

                <a href="#" class="text-dark font-weight-medium font-size-16">Patrick Becker</a>
                <p class="text-body mt-1 mb-0 font-size-13">Administrator</p>

            </div>
        </div>

        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled" id="side-menu">
                <li class="menu-title">Menu</li>

                <li>
                    <a href="dashboard" class=" waves-effect">
                        <i class="mdi mdi-airplay"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                

                <li>
                    <a href="calendar" class=" waves-effect">
                        <i class="mdi mdi-calendar-text"></i>
                        <span>Calendar</span>
                    </a>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="mdi mdi-inbox-full"></i>
                        <span>Email</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="email-inbox">Inbox</a></li>
                        <li><a href="email-read">Read Email</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="mdi mdi-calendar-check"></i>
                        <span>Tasks</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="tasks-list">Task List</a></li>
                        <li><a href="tasks-kanban">Kanban Board</a></li>
                        <li><a href="tasks-create">Create Task</a></li>
                    </ul>
                </li>

                <li class="menu-title">Components</li>
                <li>
                    <a href="{{ route('services.index') }}" class=" waves-effect">
                        <i class="mdi mdi-gamepad-circle-left"></i>
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="mdi mdi-checkbox-multiple-blank-outline"></i>
                        <span>Courier</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="{{ route('deliveries.index') }}">Deliveries</a></li>
                        <li><a href="{{ route('delivery-modes.index') }}">Delivery Mode</a></li>
                    </ul>
                </li>
                <li>
                    <a href="{{ route('customers.index') }}" class=" waves-effect">
                        <i class="mdi mdi-account"></i>
                        <span>Customers</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('employees.index') }}" class=" waves-effect">
                        <i class="mdi mdi-account-cash-outline"></i>
                        <span>Employees</span>
                    </a>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="mdi mdi-pharmacy"></i>
                        <span>Pharmacy</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="{{ route('pharmacies.index') }}">Pharmacies</a></li>
                        <li><a href="{{ route('pharmacy-items.index') }}">Pharmacy Items</a></li>
                    </ul>
                </li>
                <li>
                    <a href="{{ route('in-app-messages.index') }}" class=" waves-effect">
                        <i class="mdi mdi-chat"></i>
                        <span>In-App Messages</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('terms-and-conditions.index') }}" class=" waves-effect">
                        <i class="mdi mdi-progress-alert"></i>
                        <span>Terms and Conditions</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('promotional-ads.index') }}" class=" waves-effect">
                        <i class="mdi mdi-image-size-select-small"></i>
                        <span>Promotional Ads</span>
                    </a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="mdi mdi-drone"></i>
                        <span>UAV</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="maps-google">Map</a></li>
                        <li><a href="{{ route('drones.index') }}">Drones</a></li>
                        <li><a href="drones-restrictions">Drone Restrictions</a></li>
                    </ul>
                </li>
               <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="mdi mdi-folder-settings-variant"></i>
                        <span>Settings</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="{{ route('countries.index') }}">Countries</a></li>
                        <li><a href="{{ route('states.index') }}">States</a></li>
                        <li><a href="payment-methods">Payment Methods</a></li>
                        <li><a href="{{ route('general-settings.index') }}general-settings">General</a></li>
                        
                    </ul>
                </li>
                    </ul>
                </li>

            </ul>
        </div>
        <!-- Sidebar -->
    </div>
</div>
<!-- Left Sidebar End -->