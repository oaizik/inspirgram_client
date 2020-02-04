// const BASE_URL = 'https://legalapp-server.herokuapp.com';
// const SERVER_URL = 'https://legalup-staging.s3-us-west-1.amazonaws.com';

const BASE_URL = 'http://localhost:3001';
const SERVER_URL = 'http://localhost:3000';

async function postApi(path, body) {
    const strBody = typeof body === 'string' ? body : JSON.stringify(body);
    console.log('posting body ' + strBody.length + ' bytes long', strBody);
    const data = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access_token': localStorage.getItem('access_token')
        },
        method: 'POST',
        mode: 'cors',
        body: strBody
    });
    
    const response = await data.json();
    if (data.status === 200) {
        return response.result;
    } else {
        const error = new Error(data.statusText);
        error.code = data.status;
        throw error;
    }
}

async function patchApi(path, body) {
    const strBody = typeof body === 'string' ? body : JSON.stringify(body);
    console.log('patching body ' + strBody.length + ' bytes long', strBody);
    const data = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access_token': localStorage.getItem('access_token')
        },
        method: 'PATCH',
        mode: 'cors',
        body: strBody
    });
    
    const response = await data.json();
    if (data.status === 200) {
        return response.result;
    } else {
        const error = new Error(data.statusText);
        error.code = data.status;
        throw error;
    }
}

async function getApi(path, query) {
    const queryPart = query !== undefined ? `?${query}`: '';
    const data = await fetch(`${BASE_URL}${path}${queryPart}`, {
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access_token': localStorage.getItem('access_token')
        },
        mode: 'cors',
        method: 'GET'
    });
    const response = await data.json();
    // console.log('got after get:', response);
    if (data.status === 200) {
        return response.result;
    } else {
        const error = new Error(data.statusText);
        error.code = data.status;
        throw error;
    }
}

async function deleteApi(path, query) {
    const queryPart = query !== undefined ? `?${query}`: '';
    const data = await fetch(`${BASE_URL}${path}${queryPart}`, {
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access_token': localStorage.getItem('access_token')
        },
        mode: 'cors',
        method: 'DELETE'
    });
    const response = await data.json();
    console.log('got after get:', response);
    if (data.status === 200) {
        return response.result;
    } else {
        const error = new Error(data.statusText);
        error.code = data.status;
        throw error;
    }
}
export class Users {
    async authenticate(email, password) {
        const body = { email, password }; 
        const user = await postApi('/users/authenticate', body);
        localStorage.setItem('current_user', JSON.stringify(user));
        localStorage.setItem('access_token', user.access_token)
        return user;
    }
    async create(email, password) {
        const body = { email, password, username: email};
        const user = await postApi('/users',  body);
        localStorage.setItem('current_user', JSON.stringify(user));
        localStorage.setItem('access_token', user.access_token)
        return user;
    }
}

export class Documents {
    async createDocument(body) {
        const document = await postApi('/documents/', body);
        return document;
    }

    async updateDocument(id, body) {
        const document = await patchApi(`/documents/${id}/`, body);
        return document;
    }

    async getDocument(id) {
        const document = await getApi(`/documents/${id}/`);
        return document;
    }

    async getClause(clauseId, documentId) {
        const clause = await getApi(`/documents/${documentId}/clauses/${clauseId}/`);
        return clause;
    }
    
    async updateClause(clauseId, documentId, body) {
        return patchApi(`/documents/${documentId}/clauses/${clauseId}/`, body);
    }

    async deleteClauseAlternative(clauseId, documentId, alternativeId) {
        return deleteApi(`/documents/${documentId}/clauses/${clauseId}/alternatives/${alternativeId}`);
    }
    
    async getDocuments(sort, pageSize, pageIndex) {
        return getApi(`/documents?sort=${sort || '-updated_at'}&page_size=${pageSize || 20 }&page_index=${pageIndex || 0}`);
    }

    async createQuestion(documentId, body) {
        return postApi(`/documents/${documentId}/questions/`, body);
    }

    async updateQuestion(documentId, questionId, body) {
        return patchApi(`/documents/${documentId}/questions/${questionId}/`, body);
    }

    async deleteQuestion(documentId, questionId) {
        return deleteApi(`/documents/${documentId}/questions/${questionId}/`);
    }

    async getQuestions(documentId) {
        return getApi(`/documents/${documentId}/questions/`);
    }

    async getQuestion(documentId, questionId) {
        return getApi(`/documents/${documentId}/questions/${questionId}/`);
    }

    async createPhrase(documentId, clauseId, body) {
        return postApi(`/documents/${documentId}/clauses/${clauseId}/phrases/`, body);
    }

    async getPhrase(documentId, clauseId, phraseId) {
        return getApi(`/documents/${documentId}/clauses/${clauseId}/phrases/${phraseId}/`);
    }    

    async updatePhrase(documentId, clauseId, phraseId, body) {
        return patchApi(`/documents/${documentId}/clauses/${clauseId}/phrases/${phraseId}/`, body);
    }
}
export class Files {
    async createDocx(documentId, answersArray) {
        const body = {document_id: documentId, answers: answersArray};
        return postApi(`/files/`,  body);
    }
}
const def = {
    users: new Users(),
    documents: new Documents(),
    files: new Files()
}
export {def as default, SERVER_URL};
