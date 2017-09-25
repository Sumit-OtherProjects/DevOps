server {
        listen 80;
        listen [::]:80;

        root /vol/checkbox.io/public_html;
        
        server_name checkbox.io;

        location / {
                try_files $uri $uri/ =404;
        }
}
