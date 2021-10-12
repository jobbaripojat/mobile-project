import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('awis.db');

export const Init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('create table if not exists apps(id integer not null primary key, name text not null);',      
            [],
            ()=>{resolve(); },
            (_,err)=>{reject(err);}
            );
        });
    });
    return promise;
};

export const Drop=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('drop table apps;',      
            [],
            ()=>{resolve(); },
            (_,err)=>{reject(err);}
            );
        });
    });
    return promise;
};

export const FetchAppNames = () => {
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('select * from apps;',
            [],
            (tx, result) => { 
                resolve(result);
            },
            (tx, err) => {
                reject(err);
            });
        });
    });
    return promise;
};

export const InstallApp=(id, app_name)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('insert into apps(id, name) values(?,?);',
            //And the values come here
            [id, app_name],
            //If the transaction succeeds, this is called
            (_, result)=>{
                resolve(result);
                console.log("Success");
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
                console.log("NOPE");
            }
            );
        });
    });
    return promise;
};
