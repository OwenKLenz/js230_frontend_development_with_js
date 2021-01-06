function cancelThings(route, method) {
  return function(id, element){
    let cancelRequest = new XMLHttpRequest();
    cancelRequest.open(method, route + id);
    cancelRequest.addEventListener('load', () => {
      if (cancelRequest.status === 204) {
        alert('Removed!');
        element.remove();
      } else {
        alert(cancelRequest.responseText);
      }
    });

    cancelRequest.send();
  }
}

const cancelSchedule = cancelThings('http://localhost:3000/api/schedules/', 'DELETE');
const cancelBooking = cancelThings('http://localhost:3000/api/bookings/', 'PUT');
