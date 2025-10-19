const noteEl = document.getElementById ("notes");
const resultEl = document.getElementById("result");

const notes={
    
    id: 0 ,
    title : "",
    content : "",
    createdAt : new Date(),

} //template 

let index = 0 ;

function getNote () {

    const notestring =localStorage.getItem('notes') || '[]' ; 
    return JSON.parse(notestring) ;

}

function saveNote(notesArray) {

    localStorage.setItem('notes',JSON.stringify(notesArray));     

}

function addNote (event) {
    
    event.preventDefault();
    const theForm = event.target;
    const formData = new FormData(theForm);

    const notenew={

        ...notes,
        id:index++,
        title: formData.get("title") || "" , 
        content: formData.get("content") || "",
        createdAt : new Date().toISOString().toLowerCase() , 

    }

    const allNotes = getNote();
    allNotes.push(notenew);
    saveNote(allNotes);



if (resultEl) {

    resultEl.innerHTML="note successfully added ! ";

}

theForm.reset();

return notenew ; //not essantial but might prove useful if i intend to add smth 

}



function displayNote (notesArray) {

if (!noteEl) return ; 

let notesHTML = "" ; 

notesArray.forEach( note=>{

notesHTML +=`

<div class="note-item" id="note-${note.id}">
<h2 class="note-title">${note.title}</h2>
<p class="note-content">${note.content}</p>
<p class="note-date">Created: ${new Date(note.createdAt).toLocaleString()}</p>
<button class="delete" onclick="deleteNote(${note.id})" type="button">delete</button>
</div>
`;
});

noteEl.innerHTML= notesHTML ;

}


function searchNote () {

const inputNote = document.getElementById("search-title").value.toLowerCase();    
const AllNotes = getNote () ; 
const filteredNotes = AllNotes.filter ( note => {
const title = note.title.toLowerCase();
return title.includes(inputNote)



} ) ; 
displayNote(filteredNotes) ;

}

function deleteNote (noteId) {

const AllNotes = getNote  ();

const updatedNotes = AllNotes.filter (note => note.id !== noteId)

saveNote (updatedNotes);

}

function renderPage () {

    const AllNotes = getNote () ;
    displayNote(AllNotes);
    
}

