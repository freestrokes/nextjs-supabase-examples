export const postQueryKeys = {
	all: ['post'] as const,
	findAll: () => [...postQueryKeys.all, 'findAll'] as const,
	getOne: () => [...postQueryKeys.all, 'getOne'] as const,
	create: () => [...postQueryKeys.all, 'create'] as const,
	update: () => [...postQueryKeys.all, 'update'] as const,
	delete: () => [...postQueryKeys.all, 'delete'] as const,
	findAllWithParam: () => [...postQueryKeys.all, 'findAllWithParam'] as const,
	getOneWithParam: () => [...postQueryKeys.all, 'getOneWithParam'] as const,
	createWithParam: () => [...postQueryKeys.all, 'createWithParam'] as const,
	// list: (filters: string) => [...postQueryKeys.lists(), { filters }] as const,
	// detail: (id: number) => [...postQueryKeys.details(), id] as const,
};