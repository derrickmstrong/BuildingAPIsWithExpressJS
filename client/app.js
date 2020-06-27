$(document).ready(() => {
    // Onload Display Chirps
  getChirps();
});

// Get chirps
const getChirps = () => {
  // Clear container
  $('#chirp-container').empty();

  $.get('/api/chirps/', (chirps) => {
    // Console all chirps
    console.log(chirps);

    // Delete are the nextid property so they don't show up in the writeArr array
    delete chirps.nextid;

    // Create an array of chirps
    const writeArr = Object.entries(chirps);

    // Reverse chirps order
    writeArr.reverse();

    // Loop through chirps w/forEach
    writeArr.forEach((chirp) => {
      // Generate card for each chirp
      $('#chirp-container').append(
        `<div class='col-6 mx-3'>
            <div class='card my-3'>
                
                <div class='card-body'>
                <h5 class='card-title'>${chirp[1].user}</h5>
                <p class='card-text'>${chirp[1].text}</p>
                </div>
           <div class='card-footer manage-chirp'>
                <span onclick="deleteChirp(${chirp[0]})" class='mx-2'><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill btn-close" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
</svg></span> 



<!-- Button trigger modal -->
<span data-toggle="modal" data-target="#modal${chirp[0]}" class='mx-2'><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg></span>



</div> 
</div>
       <!-- Modal -->
<div class="modal" id="modal${chirp[0]}" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${chirp[1].user}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <textarea id="edit-chirp-text${chirp[0]}">${chirp[1].text}</textarea>
      </div>
      <div class="modal-footer">
      <button onclick="editChirp(${chirp[0]}, '${chirp[1].user}', $('#edit-chirp-text${chirp[0]}').val())" type="button" class="btn btn-primary">Update</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> </div>`
      );
    });
  });
};

// Submit/Post chirp
const submitChirp = () => {
  // Pull in input values
  const user = $('#user').val();
  const text = $('#text').val();

  // Setup data structure
  const data = {
    user: user,
    text: text,
  };
  console.log(data);

  // Post data
  $.ajax('/api/chirps/', {
    data: JSON.stringify(data),
    method: 'post',
    contentType: 'application/json',
  });

  // Clear input values
  $('#user').val('');
  $('#text').val('');

  getChirps();
};

// Delete chirp
const deleteChirp = (id) => {
  $.ajax(`/api/chirps/${id}`, { method: 'delete' });

  getChirps();
};

// Edit/Put chirp
const editChirp = (id, user, text) => {
    const chirpObj = {
        user: user,
        text: text
    }

    $.ajax(`/api/chirps/${id}`, {
        data: JSON.stringify(chirpObj),
        method: 'put',
        contentType: 'application/json'
    })

    getChirps();
};
