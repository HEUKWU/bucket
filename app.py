from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://test:sparta@cluster0.dq4uizr.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')

@app.route("/bucket", methods=["POST"])
def bucket_post():
    bucket_receive = request.form['bucket_give']

    bucket_list = list(db.bucket.find({}, {'_id: False'}))
    count = len(bucket_list) + 1

    if (db.bucket.find_one({'num': count}) is not None):
        count = count + 1
        doc = {
            'num': count,
            'bucket': bucket_receive,
            'done': 0
        }

    else:
        doc = {
            'num': count,
            'bucket': bucket_receive,
            'done': 0
        }

    db.bucket.insert_one(doc)

    return jsonify({'msg': '등록 완료!'})

@app.route("/bucket/done", methods=["POST"])
def bucket_done():
    num_receive = request.form['num_give']
    user = db.bucket.update_one({'num': int(num_receive)}, {'$set': {'done': 1}})
    return jsonify({'msg': '버킷 완료!'})

@app.route("/bucket/cancel", methods=["POST"])
def bucket_cancel():
    num_receive = request.form['num_give']
    user = db.bucket.update_one({'num': int(num_receive)}, {'$set': {'done': 0}})
    return jsonify({'msg': '취소 완료!'})

@app.route("/bucket/delete", methods=["POST"])
def bucket_delete():
    num_receive = request.form['num_give']
    user = db.bucket.delete_one({'num': int(num_receive)})
    return jsonify({'msg': '삭제 완료!'})

@app.route("/bucket", methods=["GET"])
def bucket_get():
    buckets_list = list(db.bucket.find({}, {'_id': False}))
    return jsonify({'buckets': buckets_list})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)