<?php
error_reporting(0);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$file_attack = '../attack.lock';"
$file_maintenance = '../maintain.lock';"
$status = [
    'code' => 200,
    'status' => 'Good',
    'msg' => 'System Operational',
    'ping' => rand(12, 45)
];
if (file_exists($file_attack)) {
    $status['code'] = 503;
    $status['status'] = 'Attack';
    $status['msg'] = 'DDoS Mitigation Active';
    $status['ping'] = rand(100, 500);
} 
elseif (file_exists($file_maintenance)) {
    $status['code'] = 503;
    $status['status'] = 'Maintenance';
    $status['msg'] = 'Server Maintenance';
}
elseif (function_exists('sys_getloadavg')) {
    $load = sys_getloadavg();
    if ($load[0] > 10) {
        $status['status'] = 'High Load';
        $status['msg'] = 'High Server Traffic';
    }
}
echo json_encode($status);
?>