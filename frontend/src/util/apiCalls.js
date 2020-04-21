import axios from 'axios'
export default {
    getIdentitiesAll(n=20, skip=0, root=null, query='') {
        return axios.get('api/v1/identity', {
            params: {
                n,
                skip,
                ...(root && {root}),
                ...(query && {query})
            }
        }).then(res => res.data.reduce((agg,{id}) => {
            agg[id] = id
            return agg
        }, {}))
    },
    getUser(id, includeInterestsAndIdentities) {
        const querystring = `/api/v1/user/${id}${includeInterestsAndIdentities ? '?interests=true&identities=true' : ''}`.replace('.', '%2e')
        console.log(querystring)
        return axios.get(querystring)
        .then(res => res.data)
        .then(data => {
            console.log(data)
            if(includeInterestsAndIdentities) {
                return {
                    interestsKnown: data.interests.reduce((agg,{id}) => ({...agg, id:id}), {}),
                    identitiesKnown: data.identities.reduce((agg,{id}) => ({...agg, id:id}), {})
                }
            }
            else {
                return data.displayName
            }
        })
    },
    addUserItem(item, idOrInterest) {
        return axios.post(`api/v1/user/${idOrInterest}`, {identity: item})
    },
    rmUserItem(item, idOrInterest) {
        return axios.delete(`api/v1/user/${idOrInterest}`, {identity:item})
    }
}