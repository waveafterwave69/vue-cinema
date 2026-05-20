import { moviesOldApi } from './baseApi'

export const actorsApi = {
    async getActorInfo(actorId: string) {
        const response = await moviesOldApi.get(`/staff/${actorId}`)

        return response.data
    },
}
