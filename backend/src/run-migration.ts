import { AppDataSource } from "../ormconfig"; // Importa sua configuração

async function runMigrations() {
    console.log("Inicializando DataSource para migração...");
    try {
        // Inicializa a conexão com o banco de dados
        await AppDataSource.initialize(); 
        console.log("DataSource inicializado com sucesso.");

        console.log("Executando migrações pendentes...");
        // Executa as migrações que ainda não foram aplicadas
        await AppDataSource.runMigrations(); 
        console.log("Migrações executadas com sucesso! ✅");

    } catch (error) {
        console.error("Erro durante a execução das migrações: ❌", error);
        process.exit(1); // Sai com erro se a migração falhar

    } finally {
        // Fecha a conexão com o banco de dados, se ela foi aberta
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("DataSource desconectado.");
        }
    }
}

// Chama a função para executar as migrações
runMigrations();