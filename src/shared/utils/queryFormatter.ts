export function formatPrismaQuery(event: { query: string; params: string }) {
    const params: string[] = JSON.parse(event.params);
    let query = event.query.replace(/"public"\./g, '').replace(/"([^"]+)"/g, '$1');

    params.forEach((value, index) => {
        query = query.replace(new RegExp(`\\$${index + 1}\\b`, 'g'), value);
    });

    return query;
}
